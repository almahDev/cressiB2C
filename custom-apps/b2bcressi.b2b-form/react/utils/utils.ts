export const DEBUG_MODE = false
export const DEVELOPER_IO_ENTITY = 'revendedor'

export const isIOAccount = (account: string) => /io/i.test(account)

export const entityProdToDeveloper = (account: string, entity: string) => {
  return isIOAccount(account) ? DEVELOPER_IO_ENTITY : entity
}

export const calculateAge = (date: string) => {
  console.log('🚀 ~ file: utils.ts:11 ~ calculateAge ~ date', date)
  try {
    if (!date || !date?.length) {
      return 0
    }

    const dateSplit = date?.split('/')
    const dateParsed = new Date(
      parseInt(dateSplit[2], 10),
      parseInt(dateSplit[1], 10) - 1,
      parseInt(dateSplit[0], 10)
    )

    const currentDate = Date.now() - dateParsed.getTime()
    const birthdayDate = new Date(currentDate)

    return Math.abs(birthdayDate.getUTCFullYear() - 1970)
  } catch (t) {
    console.error(`Não foi possível obter a idade -> ${t.message}`)

    return 0
  }
}

export const getUTCDate = (date: string) => {
  const [day, month, year] = date.split('/')

  return `${year}-${month}-${day}`
}
