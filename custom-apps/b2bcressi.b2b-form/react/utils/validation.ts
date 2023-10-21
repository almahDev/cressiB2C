import { isDate, parse } from 'date-fns'

/* eslint-disable no-console */
export const validateCnpj = (cnpj: string): boolean => {
  if (!cnpj) return false

  // Aceita receber o valor como string, número ou array com todos os dígitos
  const isString = typeof cnpj === 'string'
  const validTypes = isString || Number.isInteger(cnpj) || Array.isArray(cnpj)

  // Elimina valor em formato inválido
  if (!validTypes) return false

  // Filtro inicial para entradas do tipo string
  if (isString) {
    // Limita ao máximo de 18 caracteres, para CNPJ formatado
    if (cnpj.length > 18) return false

    // Teste Regex para veificar se é uma string apenas dígitos válida
    const digitsOnly = /^\d{14}$/.test(cnpj)
    // Teste Regex para verificar se é uma string formatada válida
    const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(cnpj)

    // Se o formato é válido, usa um truque para seguir o fluxo da validação
    if (digitsOnly || validFormat) true
    // Se não, retorna inválido
    else return false
  }

  // Guarda um array com todos os dígitos do valor
  const match = cnpj.toString().match(/\d/g)
  const numbers = Array.isArray(match) ? match.map(Number) : []

  // Valida a quantidade de dígitos
  if (numbers.length !== 14) return false

  // Elimina inválidos com todos os dígitos iguais
  const items = [...new Set(numbers)]

  if (items.length === 1) return false

  // Cálculo validador
  const calc = (x: number) => {
    const slice = numbers.slice(0, x)
    let factor = x - 7
    let sum = 0

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i]

      sum += n * factor--
      if (factor < 2) factor = 9
    }

    const result = 11 - (sum % 11)

    return result > 9 ? 0 : result
  }

  // Separa os 2 últimos dígitos de verificadores
  const digits = numbers.slice(12)

  // Valida 1o. dígito verificador
  const digit0 = calc(12)

  if (digit0 !== digits[0]) return false

  // Valida 2o. dígito verificador
  const digit1 = calc(13)

  return digit1 === digits[1]
}

export const validateCpf = (strCPF: string): boolean => {
  let sum
  let remainder

  sum = 0

  if (strCPF === '00000000000' || allEqual(strCPF)) return false

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(strCPF.substring(i - 1, i), 10) * (11 - i)
  }

  remainder = (sum * 10) % 11

  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(strCPF.substring(9, 10), 10)) return false

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(strCPF.substring(i - 1, i), 10) * (12 - i)
  }

  remainder = (sum * 10) % 11

  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(strCPF.substring(10, 11), 10)) return false

  return true
}

function allEqual(string: string) {
  for (let i = 1; i < string.length; i++) {
    if (string[i] !== string[0]) {
      return false
    }
  }

  return true
}

export const parseDateString = (
  _value: string,
  originalValue: string
): string | Date => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, 'dd/MM/yyyy', new Date())

  return parsedDate
}
