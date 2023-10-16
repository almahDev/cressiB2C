fetch('/api/dataentities/AD/schemas/al-form', {
  headers: { 'Content-Type': 'application/json' },
  method: 'PUT',
  dataType: 'json',
  contentType: 'application/json',
  body: JSON.stringify({
    properties: {
      city: { type: 'string', maxLength: 750, title: 'Cidade' },
      userId: {
        type: 'string',
        IsRelationship: true,
        title: 'Cliente',
      },
      reference: {
        type: 'string',
        maxLength: 750,
        title: 'Referência',
      },
      street: { type: 'string', title: 'Rua' },
      state: { type: 'string', maxLength: 100, title: 'Estado' },
      complement: {
        type: 'string',
        maxLength: 750,
        title: 'Complemento',
      },
      countryfake: { type: 'string', title: 'countryfake' },
      geoCoordinate: { type: 'string', title: 'Coordenada geográfica' },
      addressType: {
        type: 'string',
        maxLength: 50,
        title: 'Tipo de Endereço',
      },
      neighborhood: {
        type: 'string',
        maxLength: 750,
        title: 'Bairro',
      },
      addressName: {
        type: 'string',
        maxLength: 50,
        title: 'Nome do Endereço',
      },
      number: { type: 'string', maxLength: 750, title: 'Número' },
      country: { type: 'string', maxLength: 100, title: 'País' },
      receiverName: {
        type: 'string',
        maxLength: 750,
        title: 'Pessoa que irá receber',
      },
      postalCode: { type: 'string', maxLength: 50, title: 'CEP' },
    },
    required: ['addressName', 'userId', 'id'],
    'v-indexed': ['addressName', 'postalCode', 'userId', 'id'],
    'v-security': {
      allowGetAll: false,
      publicRead: ['id'],
      publicWrite: [
        'postalCode',
        'addressName',
        'addressType',
        'street',
        'number',
        'complement',
        'neighborhood',
        'city',
        'state',
        'country',
        'userId',
      ],
      publicFilter: [],
    },
  }),
})
