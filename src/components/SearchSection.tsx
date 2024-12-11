import React,{useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Clock, User, Phone } from 'lucide-react';
const url = "https://randomuser.me/api/";
export const SearchSection = () => {
  const [users,setUser] = useState('')

  useEffect(
    () => {
      fetch(url)
      .then(res => res.json())
      .then(data => setUser(data.results[0]))

      console.log(users)
    },[]
  )
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="missing-persons">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Find Missing Persons & Items
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced AI system processes real-time data from over 160 cameras to help locate missing individuals
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-12"
          >
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Search Type
                </label>
                <select className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500">
                  <option>Missing Person</option>
                  <option>Missing Child</option>
                  <option>Lost Item</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <select className="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500">
                  <option>All Locations</option>
                  <option>Ram Ghat</option>
                  <option>Mahakal Temple</option>
                  <option>Kalbhairav Temple</option>
                </select>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors mt-6"
              >
                <Search className="mr-2" />
                Search Now
              </motion.button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                key={1}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    src={`data:image/jpeg;base64,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`}
                    alt="Missing Person"
                    className="w-24 h-24 object-cover rounded-xl shadow-md"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">Case #{1 + 1}</h3>
                        <p className="text-gray-600 text-sm">ID: MP24X7H9K{1}</p>
                      </div>
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <p className="text-gray-600 flex items-center text-sm">
                        <User className="w-4 h-4 mr-2" />
                        Age: {20 + 1} • Male
                      </p>
                      <p className="text-gray-600 flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        Last seen: Ram Ghat
                      </p>
                      <p className="text-gray-600 flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        2 hours ago
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center text-sm font-medium"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              <motion.div
                key={1}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    src={`data:image/jpeg;base64,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`}
                    alt="Missing Person"
                    className="w-24 h-24 object-cover rounded-xl shadow-md"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">Case #{1 + 1}</h3>
                        <p className="text-gray-600 text-sm">ID: MP24X7H9K{1}</p>
                      </div>
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <p className="text-gray-600 flex items-center text-sm">
                        <User className="w-4 h-4 mr-2" />
                        Age: {20 + 1} • Male
                      </p>
                      <p className="text-gray-600 flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        Last seen: Ram Ghat
                      </p>
                      <p className="text-gray-600 flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        2 hours ago
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center text-sm font-medium"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              <motion.div
                key={1}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    src={`data:image/jpeg;base64,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`}
                    alt="Missing Person"
                    className="w-24 h-24 object-cover rounded-xl shadow-md"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">Case #{1 + 1}</h3>
                        <p className="text-gray-600 text-sm">ID: MP24X7H9K{1}</p>
                      </div>
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <p className="text-gray-600 flex items-center text-sm">
                        <User className="w-4 h-4 mr-2" />
                        Age: {20 + 1} • Male
                      </p>
                      <p className="text-gray-600 flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        Last seen: Ram Ghat
                      </p>
                      <p className="text-gray-600 flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        2 hours ago
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center text-sm font-medium"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              <motion.div
                key={1}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    src={`data:image/jpeg;base64,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`}
                    alt="Missing Person"
                    className="w-24 h-24 object-cover rounded-xl shadow-md"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">Case #{1 + 1}</h3>
                        <p className="text-gray-600 text-sm">ID: MP24X7H9K{1}</p>
                      </div>
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <p className="text-gray-600 flex items-center text-sm">
                        <User className="w-4 h-4 mr-2" />
                        Age: {20 + 1} • Male
                      </p>
                      <p className="text-gray-600 flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        Last seen: Ram Ghat
                      </p>
                      <p className="text-gray-600 flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        2 hours ago
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center text-sm font-medium"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              <motion.div
                key={1}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    src={`data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEhUQEBAPFhAQEA8VEBAWFQ8VFhUQFxUWFhUWFhUYHSggGBolGxcVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGislHyUtLS0tLS0tLS0tLS0tLS0tLy0tLS0tLS0tLS0tLy0tLS0tLS0tLS0tLSstLSstKystLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAABAAIEBQYDB//EAD4QAAEDAgMFBQUGBAYDAAAAAAEAAhEDBAUhMQYSQVFxEyJhgZEyobHB0QcjM1Lh8BRCcpJDU2JzwvEVsrP/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQMEAgUG/8QAKBEBAAICAQQCAgEFAQAAAAAAAAECAxEhBBIxQQVRIjJxFCNSgcET/9oADAMBAAIRAxEAPwC4AToRARhdKQhKEYRhEglCdCICINhGE6EUDIShPUW/vqVFpfVe1rRxJjyHM+ARLumea88xz7QnmW2zA1v+Y8d4+IboPPPwCxmIY1cVj95WqOHLeIHoMlG3cUn29vq3tNvtPaI8QmvxCk2JqNg6GRmvBGP48ealse7dOZ6Z6ps7HsdztFb03tpufm6M+AnSTwUz/wAnQnd7akHflL2g+hK8MZXcTJJn3p73keevVSdr3trwdDroivF8G2lubY/dvln+W+XN8hII8it9gW3FvWhtWKVQwId7Dj/pfw6GPNETWWqhCE5pRhHDnCBC6QgQg5EJsLqQmkIOZCaQukIEIOJCa5q6kJpCDjupLpCSCaAiiAiAgQCMIgIoGwiikpAhJOUDGL/sWbwaXPJhjBqXfRQOGOYr2LYaA6ofZbIAHi48l5ZtDfuqOLqtUvfwA9lo/wBPAeU9SrPaC8e2alV/3jpMBzgByGunRYy8quLjvb28CZDpkHiIOiiV0RqHOo9MCDj8UmhB1ptVjb01FtqZnMK4s7aSMlEzw6iEK+td2HjQgGPFMpw5vCfP4LW3GEudSiDkCRGfvWWfRNMwQfP9FxS/p1akoFRhHJBr1Or0w4KveyP2VarbDY/a51sOxqgutye6Qe9TnWAdW8Y6r1O3rte0PY4Oa4AtcNCCvAmHKPMrYbA7Qmi8W9R33NU9wk+xUOnQH4o5tG3qUJpCckiswhNIXQhNIQcyECuhCaQg5kJpC6FNIQcoST4SQTAE4BIIqQEUkUARSRQNKzGM3MtNXLcG8GTHs8+mUyr3FakUyBq+GN6uy9wk+SxW3dy2kxtJslzmd/jugfUxl9FDukMHjt2XvJJnhrw1EA/v1VW97nZmSYAnwAgdcl0c0nLXPIwZz4Kfa2QDw0+1lI5LibaWxXcuWH4U+qcgYWkttkXATAPhkrzBbQADJae2t1lvllrphrEMNS2aqA5AD0+SvcMwDdzdB8lp22yk07YLjvtKzsrCsp2UCI8lWYngTH/y5rXC3RdaSnJw8gxLZ97JIzHKB7lQ3NDwMhezYphcjRYTGcNEkwAfmrqXn2ovjjzDCmQVLYJC7XdpnyeNORUWm8tO6R68Fpids2tPXdiMYNxbgPJ7Wl3Hk/zQO66eJIifGVo4Xl/2dXpZcGjPcrMJGv4jcx0y3vReoqYVWjUmoFOQKlyaQmkLomlQOZCaQuhCaQg5wgnpIJSKSKlBBJFGEARRShBS4u5xrUabYg75cZAPBuXqf01WD+0ao0VBIBeWtDQNAB8T7lvMXqBlam6TMFuW7PeIMAHX2T4c153trbv7TeqA75M7gic/ZzmRx1En4cyuozuHgSHHgRnzJJk9Mo8lMw9rnO3jqTK42tAucR/KIA4AgAiQORzPmtDaWg5LPezTjqvcGOQWntSszYMIWis5WWfLZCzYu7FxpMXdrUhEpDCF3YAo9Ni7BhVkS4mEPECFidoLNx7zRPMLa3TFW16QKjfKdcPIcTfGR8j8FTVZccteHivSNqMDa9pcAA7PPn4FeddiWOII0Oi1Y7bhly11Kx2crmndUHzH3rAejjuuHoSvbmmV4bZiatOONWnHXeC9wojujoroZbnwgnIKXBpCEJyCBhTSE8hNKBkJIoqBICKQCIClBBFJGECSRRhBQYrTJuaEuAHfyIee7lvZNBjUZkRkfPNYzhDqlWY7rt6NAA2dSec+ct1zlaLaStUpOpupOI395jmAwHSWwXZiYBPPXRUlanVuKzbWmRMkOdqYAgg9IPmVxZdTwpqOHDNzR3QTnw5ZKba0it9fYFSoW50bTpU83Hpn5rybEdpS1xbRaQ0HU6n6Ki9JmWrHeIhtrKjzVzbABeUU9sLhvAeasLPbipMOYOslVTilbGar1y3gqHiOJtpPDN0nIEnks3gm1LamUEaK5uAyqQ5wkxzIVc7hfimszu3hd21cEA8wD5FWVGCFj7zE+yE+QCzl9tvcMyphvUj96Lqm5V31D0y5oqpuKULzkbdXz8g7+1q6C5vqo3nb59FZOOPtVGSfptLi3DgWkaryzazDTSrcpzaea2uD4pXYRTuGnccYFTM7pOkk8Pgn7d2DX2tR8d+i0uaemqmkTWS/5Q81w3OtSGX41LMf1he6UhkF4fs3TNW5oMyk1qUn/SHBzvcCvcw1a4YLgQmwnlBS4NTSE4oFA0ppT00oOaSKSkSQikEVCCCKQRQJJFNeUFVjbDAqABxpS4N46foMvBVX2RtNS9qOqDvdm858y6SqXb3HqtN/Z2tRzXUQO2yaQ5xzLcxwHzWr+yOmTWZVLHtNShUe7eBE72WXNuUA5aKvuifDR2WrHPtpftBaw27mOOUZNyje5novDatKkw+yCeUL0j7Tr9weWD0Xl91bPd3mtf2ct7SoRG67OGjMy2M5gZ9FVb8p0up+NdpLaVJ+RbSbOm85jSo95hPZ9404b+dpDm+oUO/wpwcCwbwlpbMkEcj58PFa2xwdpt6tYRQuH13OpW9MVHM7LdaC11IlxDd7fiTIHgo7Y+3XdO/Cgs6wpkELe4AX1mtLXkAEF2QO8OWfl6LBXVk4AyxzHB2bSHAdWznur0r7OaMMBIWe7RRxx2hujvLJXRbyC9Ex2xFR8OkAz+nvWCvsODakPkt/Ll74M+SUjabTpX0cQt2mH3AYQRo2Y9xV1Z4v/lVqdYDVo7rwImd3j7llqWFXFOsKlCQW9oAQGGWPBYRDssw4jTitE7ZyiLanTDSbtmbqrMuzJcXBu9o4AGOWSv7azCjutEtNh93TqwYBlSNqWTaVgONB/wAFV4JhdVkF7gfECJ6jNaHFaG9bVG86VT/1KrrPOllo9vJthd3+LpOgksFQwIz7pbx/qXsNC4DtPovJtmsMrtqVajN4dnRqjfjnEQeZj3LebJXD6lAOqEl0kOJ1Mceq0Rk/PtZL4f7fe0ZCCLUir2UwoFOQKBhQKcU0oGQkikgkhFAJwRBIpJIEmu/6Tk0ol5PtDbONxXaZntKzvKC4e6FvPsWuw6s5hyLadQgTMAluTeQBmBwVZtxh8NdcNHe7Isf495pB/t3/AECr/sqvRTvWmc3gtP8ASWu/5bqxUiaXmHq5bxmxxb6iIanbux3qxPisfd4U+O6DnqOa9M20AyqR+5VJZlrtQuckzWyMURNGEs7Kq3IUir61t6sd47o/KFqDYs4LjXtw0LjvWdrGYnbSc+C1+w8bsclksTry/dGpMLb7K2240czCSlbXdAOPmqHGtmm1RvRnzGo/Raa7YRmlbVWnI6rmOJJee0dnK7D3HNcPHIq3tMIq/wCIR0C1b7bkulK05rtztUULWBolfNDabp03XfBWtVoCqsZqDcIOhEHockp52izJ7OVXdm+k9ubWOG9xgN4jmrnBLLsqLW+GfX/tMo0O+akR2jRDeJ5u6fVWNPIRyPy+sqzp67tNpUdXfVYrB7EUmorawGFApxTSgaU0p5TSgYkgkpEoIhAIqECEkkUCTSE5AoImK2va0nsGpHd494ZiRxHCPFeZW9dlGtRqbpZWt7hu/E96mHAwekEei9ZCwO2GDFtR1VrC5lUHMT3KnPL581Rlr7a+nv5rLfbTHepxryKy1jXgq9tKjqtlQe8EP7GmHggg7wbunI+IWUrv3Hnqqckb5acU64auhXkKJjN4G0yfAqFa3eSiYk/fy4LO0My++psb2jyA4uJJ5GYAWu2Z2ia5oIcDGhCyN7hAcpuCYBVEuacuI5wrJ1pXzttcY2zp0iBULjMeyx7oHMwMvNTW3QqgVKekDTmquxwqnVYDUEg6j5LQ2tFjGhjQA0DIBc6deDrG9nIqe+6EZKkuQGmQgLnxTu1wdseU+rWVRed90ePwXSrcqJFUkGnuZHvBxIyPKAV1WJmOHF7RE8ptO3IcS4QRkRoZHAoO9qPAfNdQTm5xlzs3anPqcyuTc3E8gPmtmKvbXTzst+60y6oJyBVqkE0pyaUSBTCnFAoOcJIwkgkBOQCKIJFJJAkkUECKa0p6bChJ4dLS3zWJx6lDpWrr3AZmZjQ6aHiqbHKEhU5I5asNuGapXRAXOpibREu1TWuh0FV+KYYypny0hZtc8tm51wsDjFMad4+71VhYbTOENLGFhPCQR5rKWlmxhAcN4cZmVscNtbBzc6LA7hA8D84XXbC7FXujawpbSBggCnu/lM/GZUobVW5aS524QM5Pd/uXKhSsmtypMLoPAa8PJc6GH0nHe7On/a2B9VExUvEG2u0DK/4bgeSs2EqBUsGMfvNAniprHqqdbcHqZaNynmoJdMAakwrOkIAHALVgj2xdTb0LigxsdTqi75orSxkgUUCpATSnJpQAppTk0oGJJJIJATk0JyIJFBFAkkkkCRCCSJcKzBx5KsuAHAtboBl0EfUK1qNnXRRm0PvA7L2Xg+bf0C4tG4d47algsRpEOTbfkVZ4hVpmoWOIa+cpyB6Hn4KPUpRmFmtDfWzkcIL9F3o7LVjo8joSpuH3YC0dpeNhU7ldEKOx2YqtzcXHqVe0rUsCn08SEQuFe5BzUTMEbQbhiiOqQjiN+1o1UOzJcd52g0HzUxCJsscHc2oDUBnNwHkfqrloWJ+ze832PYTo4keea2zVvpERHDy8kzNp2UIoBJduCQRQKAFNKcU1ACmlOKaUDUkJSQSAigEUQKSSSApJJIEgUUCiTTouVHNwnn7lm9tdq/4IMYxgdVqBxEkhrWjKTGZz4LObFbR3d3fN7at91SpVnmm0BrCd3caDxObgcz/KuZTXmeC2zZ94fGVSWmL1aeRO+z8riZHR3/a0W2LZM81lTTWW08vQiNwthi9M5jeaeRHzCn2+PAfzD1CzPZKRQoSq507rtqGbRcjPRdf/AClV+TRA5lVthaBX1nbeC43ELO3flztrMuO88knxVkxsZeS7MpwFyqpE8kxwyn2bPIqEcgQfLJemArymyxf+DxCo2o2ab6muhDXw4EcwJjyXqwIjJejWOHk3tu0wKSSC6cEgUUCgCBSSKJNKaU4ppRBqSKSJdgimhGUQcimhFAUkkkBQSXF10wEtkbwAJHKTA+fokRtFrah579r9oT2VZoyphzHdDGfr8Vi8BrvoO7Rphx16cl6RtdcNcHUz1HVYR9pGbdOXL9FGak63CelzV7u23lZXeIOqjNcKVNc6DVKt9YWGZepUjbqZZ2wPBTaNIEKTb0AFXMrYhIs7cDgrWkxR6ACm0yuFhxCh11Le5QrqoAJPpxJ4ADmphxM6ZHGsN7a/tgOW9V/26bg4T5mPML0uyqS2OI+CzOGWha51V/4lSBH5WD2W+8k+JVxb3G4ZOnHovXx45jHz5fO5uprbPuPHhbJJlKq1wlrgR4J5XLRvZSgkgSiQQKJTSgRTUUCgCSCSDqE5NCKIFFNCbWrNYN5xAHMobdJUHFcXpW7ZqEzwaMyVR3GMVa1UMpuLKLJdVeI3uzGoB4EmGiPzKnxRpeS52rjOpyHJWRRmv1ER4WtvtTUqtfV3AymwhrGTLnvInN3AAZ5D1VBcYtW3y8kd6NPCY+JUi1p92OAmBwk6mPJRzSDpb+5VkV0y2zTMol3cuqHecc1xY2FI7AjIhdBRXcKpmXBlFp8D7vTgmPpuY4EjLnqPVSdxdWSs+Tpq25jhswfIZMfE8wsLESFMY1RcHkvLYERM+nBXDrUrzMuOaW1L6Dp89c1O+HOmpLHquuqwZmVIZmJ5hThwTlnhx1fV16eImY3t3qV+S4tbnJzPPl0HBBoXRrV6eLpaY+fb5/qfkMubjxH06NTaz4B6FOlcHneMcBr14D5+i0MUOFpLmanlIJaRHIjiu2B448VDbXBkj2KpiXM4E/NRsPd7bfyvPocwoWPUy0Nrt9qk4b3iwmD8lzNYmFuPLaluG6bVafZc09CD8EVji/eaHtPAEQrHDsXIyqGRzOo8+KpnHMeG2nVRM6nhoE0plKu1wlrgeicq2qJ2SaUUCiTUkklI6ymOrAePw9VXVsWaOAJOg4eM+5Vta/c7MldVp9s188R4W9a8ccmkDxH1P0VZd1xmGkn8zySS710b4KL2pKc4hoLjwCtisQx3zTYxgABHF5BeeTR7LfeT6clDvMmk+QUmxdvNk6kqFjTvZaOJC7VTO5drZkU55hVdCrDzPNXtJn3ceCzd0N1/mjmJ3MrqrQDhPEcfqozqUaiPh6qfZDeb5LkDDt06KRDqN8EGDwXXECKRBI7jtCOB+CTaTHiQ5w9PogtdnGCXO8QP37lpqlEbsrH4bcPY8NkbhdnkOmq1sGIleT1cTF9z7fS/G3rOGKx68sJtZVIkBWuz1x2ltSdOe5uk+LCWH3tUzFcNYWlz8+Q5k5AesLjYWLKLSxk7m84gEzBOseH1VvRb3Ms/y817ax7SYCK5OeQYETEn9/vRR7uo6N0E7zuWUDmvR28HtdqtfPcb7R1P5R9V2YwAQFws7YMHiV3JQlUUX7ty9v5gCrG5oh7HMOjmkeoVZf8AduGO5yFbEoiVBgFbumk/VhLSFOps3XEeiqbqaVwSNKnxV4HeyDqRl9EdbOBHhI48fVSaN9Ubo4kcnd736+9VVeruVQODgpu6omIl3W9q+JXVtiLXZO7p93qpZKzYXQXj2wA4gF3geB5qm2P6a8fVf5L1JVX8e/m30SXP/nK7+popLnVvn8l0ZokkrYYbH0k6/wDwz0SSXaozDPYVdjXts/qCSSJj9lyz2fJZfEvbSSUuK+V9hOg6Jt77aSShPtx2i/BH9QUPDdEElCYTKOpW2akkvO6z0934rxb/AF/1W49+G3/eo/8A0auJSSVnR/rP8qflv3r/AA4M9p3kuVP2z1HwCKS2vJSymFJJdK5VOLfiUv6vkVacEUkgnwze0H4jFaVf8LqkkiY8OGMfi0+qs6eiSSJArhW/l/q/4uQSUS6qekkkuVj/2Q==`}
                    alt="Missing Person"
                    className="w-24 h-24 object-cover rounded-xl shadow-md"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">Case #{1 + 1}</h3>
                        <p className="text-gray-600 text-sm">ID: MP24X7H9K{1}</p>
                      </div>
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <p className="text-gray-600 flex items-center text-sm">
                        <User className="w-4 h-4 mr-2" />
                        Age: {20 + 1} • Male
                      </p>
                      <p className="text-gray-600 flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        Last seen: Ram Ghat
                      </p>
                      <p className="text-gray-600 flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        2 hours ago
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center text-sm font-medium"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              <motion.div
                key={1}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    src={`${users?.picture?.large}`}
                    alt="Missing Person"
                    className="w-24 h-24 object-cover rounded-xl shadow-md"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">Case #{1 + 1}</h3>
                        <p className="text-gray-600 text-sm">ID: MP24X7H9K{1}</p>
                      </div>
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <p className="text-gray-600 flex items-center text-sm">
                        <User className="w-4 h-4 mr-2" />
                        Age: {20 + 1} • Male
                      </p>
                      <p className="text-gray-600 flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        Last seen: Ram Ghat
                      </p>
                      <p className="text-gray-600 flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        2 hours ago
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center text-sm font-medium"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <button className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium">
              Load More Cases
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};