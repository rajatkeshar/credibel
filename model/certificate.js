module.exports = {
    name: 'certificates',
    fields: [
      {
        name: 'certsId',
        type: 'String',
        length: 256,
        index: true,
      },
      {
        name: 'name',
        type: 'String',
        length: 256,
        index: true
      },
      {
        name: 'college',
        type: 'String',
        length: 256
      },
      {
        name: 'subject',
        type: 'String',
        length: 256
      },
      {
        name: 'issuer',
        type: 'String',
        length: 256
      },
      {
        name: 'authorizer',
        type: 'String',
        length: 256
      },
      {
        name: 'senderId',
        type: 'String',
        length: 256
      },
      {
        name: 'recipientEmail',
        type: 'String',
        length: 256
      },
      {
        name: 'timestamp',
        type: 'Number'
      },
      {
        name: 'transactionId',
        length: 256,
        type: "String"
      }
    ]
  }
