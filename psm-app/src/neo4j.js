import neo4j from 'neo4j-driver'

var driver = neo4j.driver(
  'neo4j://localhost',
  neo4j.auth.basic('neo4j', '123456'),
  { disableLosslessIntegers: true }
)

export default driver