// import neo4j from 'neo4j-driver'

var driver = neo4j.driver(
  'bolt://185.185.40.33:7687',
  neo4j.auth.basic('neo4j', '123456'),
  { disableLosslessIntegers: true }
)

export default driver