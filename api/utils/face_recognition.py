import os
import base64
from io import BytesIO
from PIL import Image
from deepface import DeepFace
import numpy as np
import cv2
from typing import Dict, List, Optional, Tuple

class FaceRecognitionService:
    def __init__(self, db_path: str = "face_db"):
        self.db_path = db_path
        os.makedirs(db_path, exist_ok=True)
        self.detector_backend = 'opencv'
        self.confidence_threshold = 52

    def base64_to_image(self, base64_str: str) -> Image.Image:
        """Convert base64 string to PIL Image"""
        # Remove data URL prefix if present
        if ',' in base64_str:
            base64_str = base64_str.split(',')[1]
        
        image_data = base64.b64decode(base64_str)
        return Image.open(BytesIO(image_data))

    def save_temp_image(self, image: Image.Image, filename: str) -> str:
        """Save an image temporarily for DeepFace processing."""
        # Convert RGBA to RGB if necessary
        if image.mode == "RGBA":
            image = image.convert("RGB")
        filepath = os.path.join(self.db_path, filename)
        image.save(filepath)
        return filepath

    def extract_faces(self, image_path: str) -> List[Dict]:
        """
        Extract all faces from an image
        Args:
            image_path: Path to the image file
        Returns:
            List of dictionaries containing face data
        """
        try:
            face_objs = DeepFace.extract_faces(
                img_path=image_path,
                detector_backend=self.detector_backend,
                align=True,
                enforce_detection=True
            )
            
            return face_objs
        except Exception as e:
            print(f"Face extraction error: {str(e)}")
            return []

    def find_best_face_match(self, faces1: List[Dict], faces2: List[Dict]) -> Tuple[Optional[Dict], float]:
        """
        Find the best matching face between two sets of faces
        Args:
            faces1: List of faces from first image
            faces2: List of faces from second image
        Returns:
            Tuple of (best matching face, confidence score)
        """
        best_match = None
        highest_confidence = 0

        for face1 in faces1:
            face1_img = Image.fromarray(face1['face'])
            temp_path1 = self.save_temp_image(face1_img, "temp_face1.jpg")

            for face2 in faces2:
                face2_img = Image.fromarray(face2['face'])
                temp_path2 = self.save_temp_image(face2_img, "temp_face2.jpg")

                try:
                    result = DeepFace.verify(
                        img1_path=temp_path1,
                        img2_path=temp_path2,
                        model_name="VGG-Face",
                        distance_metric="cosine",
                        enforce_detection=False
                    )

                    confidence = (1 - result['distance']) * 100
                    if confidence > highest_confidence:
                        highest_confidence = confidence
                        best_match = face2

                except Exception as e:
                    print(f"Face verification error: {str(e)}")
                    continue

                finally:
                    # Cleanup temporary files
                    if os.path.exists(temp_path2):
                        os.remove(temp_path2)

            if os.path.exists(temp_path1):
                os.remove(temp_path1)

        return best_match, highest_confidence

    def verify_face(self, img1_base64: str, img2_base64: str) -> Dict:
        """
        Verify if two face images match by comparing all detected faces
        Args:
            img1_base64: First image in base64
            img2_base64: Second image in base64
        Returns:
            Verification result with confidence score and matched face
        """
        try:
            # Convert and save both images temporarily
            img1 = self.base64_to_image(img1_base64)
            img2 = self.base64_to_image(img2_base64)
            
            img1_path = self.save_temp_image(img1, "verify_1_temp.jpg")
            img2_path = self.save_temp_image(img2, "verify_2_temp.jpg")

            # Extract faces from both images
            faces1 = self.extract_faces(img1_path)
            faces2 = self.extract_faces(img2_path)

            if not faces1 or not faces2:
                raise Exception("No faces detected in one or both images")

            # Find best matching face
            best_match, confidence = self.find_best_face_match(faces1, faces2)

            # Clean up temporary files
            os.remove(img1_path)
            os.remove(img2_path)

            if best_match is None:
                return {
                    'verified': False,
                    'confidence': 0,
                    'distance': 1.0,
                    'matched_face': None
                }

            # Convert matched face to base64 for response
            matched_face_img = Image.fromarray(best_match['face'])
            buffered = BytesIO()
            matched_face_img.save(buffered, format="JPEG")
            matched_face_base64 = base64.b64encode(buffered.getvalue()).decode()

            return {
                'verified': confidence >= self.confidence_threshold,
                'confidence': round(confidence, 2),
                'distance': round(1 - (confidence / 100), 4),
                'matched_face': f"data:image/jpeg;base64,{matched_face_base64}"
            }

        except Exception as e:
            raise Exception(f"Face verification error: {str(e)}")

    def find_matches(self, target_image: str, threshold: float = 0.6) -> List[Dict]:
        """
        Find matching faces in the database
        Args:
            target_image: Base64 encoded image string
            threshold: Similarity threshold (0-1)
        Returns:
            List of matching results with confidence scores
        """
        try:
            # Convert base64 to image and save temporarily
            img = self.base64_to_image(target_image)
            target_path = self.save_temp_image(img, "target_temp.jpg")

            # Extract faces from target image
            target_faces = self.extract_faces(target_path)

            if not target_faces:
                raise Exception("No faces detected in target image")

            # Find matches using DeepFace
            results = DeepFace.find(
                img_path=target_path,
                db_path=self.db_path,
                enforce_detection=True,
                model_name="VGG-Face",
                distance_metric="cosine"
            )

            # Clean up temporary file
            os.remove(target_path)

            if not isinstance(results, list) or len(results) == 0:
                return []

            # Process and filter results
            matches = []
            for result in results[0].itertuples():
                confidence = 1 - float(result.VGG_Face_cosine)
                if confidence >= threshold:
                    # Extract face from matched image
                    matched_faces = self.extract_faces(result.identity)
                    if matched_faces:
                        best_match, match_confidence = self.find_best_face_match(
                            target_faces, matched_faces
                        )
                        
                        if best_match and match_confidence >= self.confidence_threshold:
                            # Convert matched face to base64
                            matched_face_img = Image.fromarray(best_match['face'])
                            buffered = BytesIO()
                            matched_face_img.save(buffered, format="JPEG")
                            matched_face_base64 = base64.b64encode(buffered.getvalue()).decode()

                            matches.append({
                                'image_path': result.identity,
                                'confidence': round(match_confidence, 2),
                                'distance': float(result.VGG_Face_cosine),
                                'matched_face': f"data:image/jpeg;base64,{matched_face_base64}"
                            })

            return sorted(matches, key=lambda x: x['confidence'], reverse=True)

        except Exception as e:
            raise Exception(f"Face recognition error: {str(e)}")