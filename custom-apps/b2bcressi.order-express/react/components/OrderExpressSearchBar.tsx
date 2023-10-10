// import React, { useEffect, useState } from 'react'
import React, { useState } from 'react'
// import { useRuntime } from 'vtex.render-runtime'

import IconSearch from '../icons/IconSearch'
// import Loading from '../Loading/Loading'
import styles from '../styles.css'
// import { DEFAULT_LOADING_MS } from '../../constants/constants'

const OrderExpressSearchBar: StorefrontFunctionComponent = () => {
  const [searchValue, setSearchValue] = useState('')
  // const { navigate } = useRuntime()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const term = decodeURIComponent(searchValue.trim())

    console.log(
      '🚀 ~ file: OrderExpressSearchBar.tsx:20 ~ handleSubmit ~ term:',
      term
    )

    // navigate({
    //   page: 'store.custom#bulario-search',
    //   params: { term },
    // })
  }

  // useEffect(() => {
  //   // TODO: fazer fetch da API quando ela estiver pronta
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, DEFAULT_LOADING_MS)
  // }, [])

  return (
    <div
      className={`${styles.searchBarWrapper} flex w-100 items-center justify-center`}
    >
      <form
        className={`${styles.searchBarForm} flex w-100 items-center justify-center`}
        onSubmit={handleSubmit}
      >
        <input
          className={`${styles.searchBar} w-100 t-body c-on-base`}
          type="text"
          placeholder="Busca"
          title="Busca"
          aria-label="barra de busca do pedido express"
          name="pedido-express-search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />

        <button
          className={`${styles.searchButton} w-100 h-100 flex items-center justify-center pointer pa-0`}
          aria-label="botão de busca do pedido express"
          type="submit"
        >
          <IconSearch />
        </button>
      </form>
    </div>
  )
}

export default OrderExpressSearchBar
