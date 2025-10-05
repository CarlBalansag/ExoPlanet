import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { StarBackground } from './StarBackground';

const exoplanetData = [
  { name: 'Kepler-452b', distance: '1,400 ly', type: 'Super Earth', confirmed: true, mass: '5 M⊕', radius: '1.6 R⊕' },
  { name: 'Proxima Centauri b', distance: '4.24 ly', type: 'Terrestrial', confirmed: true, mass: '1.27 M⊕', radius: '1.1 R⊕' },
  { name: 'TRAPPIST-1e', distance: '39.5 ly', type: 'Terrestrial', confirmed: true, mass: '0.77 M⊕', radius: '0.92 R⊕' },
  { name: 'HD 189733 b', distance: '64.5 ly', type: 'Gas Giant', confirmed: true, mass: '1.13 MJ', radius: '1.14 RJ' },
  { name: 'TOI-700 d', distance: '101.4 ly', type: 'Super Earth', confirmed: true, mass: '1.72 M⊕', radius: '1.19 R⊕' },
  { name: 'K2-18 b', distance: '124 ly', type: 'Mini-Neptune', confirmed: true, mass: '8.6 M⊕', radius: '2.6 R⊕' },
  { name: 'Kepler-1649c', distance: '300 ly', type: 'Terrestrial', confirmed: true, mass: '1.06 M⊕', radius: '1.06 R⊕' },
  { name: 'LHS 1140 b', distance: '40 ly', type: 'Super Earth', confirmed: true, mass: '6.6 M⊕', radius: '1.4 R⊕' },
  { name: 'KOI-4878.01', distance: '1,075 ly', type: 'Super Earth', confirmed: false, mass: '3.2 M⊕', radius: '1.5 R⊕' },
  { name: 'KOI-7923.01', distance: '890 ly', type: 'Gas Giant', confirmed: false, mass: '0.9 MJ', radius: '1.2 RJ' },
];

const stats = [
  { label: 'Total Exoplanets', value: '5,500+', gradient: 'from-purple-400 to-purple-600' },
  { label: 'Confirmed Planets', value: '5,000+', gradient: 'from-purple-500 to-pink-500' },
  { label: 'Candidates', value: '500+', gradient: 'from-purple-600 to-blue-500' },
  { label: 'Planetary Systems', value: '4,000+', gradient: 'from-purple-400 to-indigo-500' },
];

export function ExoplanetData() {
  return (
    <div className="min-h-screen py-24 px-4 relative bg-black">
      <StarBackground starCount={500} />
      {/* Purple background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-3xl opacity-50" />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <motion.h2
          className="text-4xl md:text-6xl text-center mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Exoplanet Statistics
        </motion.h2>
        <p className="text-center text-gray-400 mb-16 text-lg">
          Exploring the vastness of discovered worlds
        </p>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative"
            >
              <div
                className="relative rounded-2xl p-[1px]"
                style={{
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(168, 85, 247, 0.1))',
                }}
              >
                <div
                  className="rounded-2xl p-6 h-full transition-all duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.9))',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px 0 rgba(168, 85, 247, 0.2), inset 0 1px 0 0 rgba(168, 85, 247, 0.05)',
                    border: '1px solid rgba(168, 85, 247, 0.1)',
                  }}
                >
                  <div className={`text-3xl md:text-4xl mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent transition-all duration-500 group-hover:scale-110`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Exoplanet Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div
            className="relative rounded-2xl p-[1px]"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(168, 85, 247, 0.1))',
            }}
          >
            <div
              className="rounded-2xl p-6 md:p-10 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.9))',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <h3 className="text-2xl md:text-3xl mb-8 bg-gradient-to-r from-purple-300 to-purple-100 bg-clip-text text-transparent">
                Exoplanet Database
              </h3>
              
                <div 
                className="mt-8 text-md text-purple-300/70 rounded-xl p-4 border mb-4"
                style={{
                  background: 'rgba(168, 85, 247, 0.05)',
                  borderColor: 'rgba(168, 85, 247, 0.1)',
                }}
              >
                <p>M⊕ = Earth Mass | R⊕ = Earth Radius | MJ = Jupiter Mass | RJ = Jupiter Radius | ly = Light Years</p>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-purple-500/20 hover:bg-purple-500/5">
                      <TableHead className="text-purple-300">Name</TableHead>
                      <TableHead className="text-purple-300">Distance</TableHead>
                      <TableHead className="text-purple-300">Type</TableHead>
                      <TableHead className="text-purple-300">Mass</TableHead>
                      <TableHead className="text-purple-300">Radius</TableHead>
                      <TableHead className="text-purple-300">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exoplanetData.map((planet, index) => (
                      <motion.tr
                        key={planet.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="border-purple-500/10 hover:bg-purple-500/10 transition-all duration-300"
                      >
                        <TableCell className="text-white">{planet.name}</TableCell>
                        <TableCell className="text-gray-400">{planet.distance}</TableCell>
                        <TableCell className="text-gray-400">{planet.type}</TableCell>
                        <TableCell className="text-gray-400">{planet.mass}</TableCell>
                        <TableCell className="text-gray-400">{planet.radius}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={planet.confirmed ? 'default' : 'secondary'}
                            className={planet.confirmed 
                              ? 'bg-purple-500/20 text-purple-200 border-purple-400/30' 
                              : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                            }
                          >
                            {planet.confirmed ? 'Confirmed' : 'Candidate'}
                          </Badge>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* <div 
                className="mt-8 text-sm text-purple-300/70 rounded-xl p-4 border"
                style={{
                  background: 'rgba(168, 85, 247, 0.05)',
                  borderColor: 'rgba(168, 85, 247, 0.1)',
                }}
              >
                <p>M⊕ = Earth Mass | R⊕ = Earth Radius | MJ = Jupiter Mass | RJ = Jupiter Radius | ly = Light Years</p>
              </div> */}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
