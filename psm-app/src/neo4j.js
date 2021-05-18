import neo4j from 'neo4j-driver'

var driver = neo4j.driver(
  // 'bolt://psm.junyaoc.tech:7687',
  //neo4j.auth.basic('neo4j', '123456', { encrypted: 'ENCRYPTION_ON', trust: "TRUST_ALL_CERTIFICATES"}),
  'neo4j://localhost:7687',
  neo4j.auth.basic('neo4j', '123456'),
  { disableLosslessIntegers: true }
)

export default driver