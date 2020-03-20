# Data Load Test Harness

>Note: This is a temporary proof of concept.

This is a Test Harness for testing an OSDU Azure Environment Default Data Load

### Tool PreReqs

- nodejs (lts/erbium)
- direnv

### Instructions


```bash
# Clone the Repository
git clone

# Execute All Tests
npm test

# Execute Individual Tests
npm run test:count
npm run test:legal
npm run test:schema
npm run test:search
npm run test:service
```

## TODO

- Add Additional Search Tests
- Refactor Legal Tests to loop a directory of legaltag files
- Refactor Schemas Tests to loop a directory of schema files
- Add Docker support to reduce requirements purely to Docker
