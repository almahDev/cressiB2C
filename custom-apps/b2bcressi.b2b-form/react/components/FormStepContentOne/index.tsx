import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useCssHandles } from 'vtex.css-handles'
import { Spinner } from 'vtex.styleguide'

import type { FormStepContentProps } from '../FormStep'
import { CSS_HANDLES } from '../FormStep'
import FormInput from '../FormInput'
import FormStepRequiredText from '../FormStepRequiredText'
import useSearchData from '../../hooks/useSearchData'
import { calculateAge } from '../../utils/utils'

const FormStepContentOne = ({
  errors,
  touched,
  values,
  isBusiness,
  nextStep,
}: FormStepContentProps) => {
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [clicked, setClicked] = useState(false)
  const {
    searchRVDocument,
    searchRVData,
    searchRVCalled,
    searchRVLoading,
    searchRVError,
  } = useSearchData()

  const { handles } = useCssHandles(CSS_HANDLES)

  const requiredFieldsPF = [
    'email',
    'nome',
    'sobrenome',
    'genero',
    'cpf',
    'data_nascimento',
    'telefone',
  ]

  const requiredFieldsPJ = [
    'razao_social',
    'nome_fantasia',
    'cnpj',
    'ie',
    'data_abertura',
    'celular',
    'telefone',
  ]

  const isLegalAge =
    !errors?.data_nascimento &&
    touched?.data_nascimento &&
    values?.data_nascimento
      ? calculateAge(values?.data_nascimento)
      : 0

  const isValid = isBusiness
    ? requiredFieldsPJ.every(
        (field) => !errors?.[field] && touched?.[field] && values?.[field]
      )
    : requiredFieldsPF.every(
        (field) => !errors?.[field] && touched?.[field] && values?.[field]
      ) && isLegalAge >= 18

  const handleClick = () => {
    if (!isValid) {
      return
    }

    searchRVDocument(
      values?.email,
      !isBusiness ? values?.cpf : null,
      isBusiness ? values?.cnpj : null
    )
    setShowError(false)
    setLoading(true)
  }

  useEffect(() => {
    if (searchRVLoading || !searchRVCalled || searchRVError) {
      return
    }

    if (
      searchRVData &&
      searchRVData.documents &&
      searchRVData?.documents?.length
    ) {
      setShowError(true)
      setLoading(false)

      return
    }

    setShowError(false)
    setLoading(false)

    setClicked(true)

    if (!clicked) {
      nextStep()
    }

    window.location.hash = '#step-2'
  }, [searchRVData, searchRVLoading, searchRVCalled, searchRVError])

  return (
    <div
      className={`${handles.formStepContent} ${handles.formStepContentOne} flex flex-column w-100 h-100 items-stretch justify-center`}
    >
      <FormInput
        field="email"
        label="Email"
        placeholder="email@gmail.com"
        type="email"
        error={errors?.email && touched?.email}
        success={
          !errors?.email &&
          touched?.email &&
          values?.email &&
          values?.email.length
        }
        required
      />

      {isBusiness ? (
        <>
          <div
            className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
          >
            <FormInput
              field="razao_social"
              label="Razão social"
              placeholder="Digite a razão social"
              error={errors?.razao_social && touched?.razao_social}
              success={!errors?.razao_social && touched?.razao_social}
              required
            />

            <FormInput
              field="nome_fantasia"
              label="Nome fantasia"
              placeholder="Digite o nome fantasia"
              error={errors?.nome_fantasia && touched?.nome_fantasia}
              success={!errors?.nome_fantasia && touched?.nome_fantasia}
              required
            />
          </div>

          <div
            className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
          >
            <FormInput
              field="cnpj"
              label="CNPJ"
              placeholder="Digite o CNPJ"
              error={errors?.cnpj && touched?.cnpj}
              success={!errors?.cnpj && touched?.cnpj}
              mask="99.999.999/9999-99"
              required
            />

            <FormInput
              field="ie"
              label="IE"
              placeholder="Digite o IE"
              error={errors?.ie && touched?.ie}
              success={!errors?.ie && touched?.ie}
              required
            />
          </div>

          <div
            className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
          >
            <FormInput
              field="data_abertura"
              label="Data de abertura"
              placeholder="__/__/____"
              error={errors?.data_abertura && touched?.data_abertura}
              success={!errors?.data_abertura && touched?.data_abertura}
              mask="99/99/9999"
              required
            />

            <FormInput
              field="celular"
              label="Celular"
              placeholder="(__) 0000-0000"
              error={errors?.ie && touched?.ie}
              success={!errors?.ie && touched?.ie}
              mask="(99) 99999-9999"
              required
            />
          </div>

          <div
            className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
          >
            <FormInput
              field="telefone"
              label="Telefone Comercial"
              placeholder="(__) 0000-0000"
              error={errors?.telefone && touched?.telefone}
              success={!errors?.telefone && touched?.telefone}
              mask="(99) 9999-9999"
              required
            />

            <FormInput
              field="site"
              label="Site da loja/empresa"
              placeholder="Digite o site da sua loja/empresa"
              error={errors?.site && touched?.site}
              success={!errors?.site && touched?.site}
            />
          </div>

          <div
            className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
          >
            <FormInput
              field="instagram"
              label="Instagram da loja/empresa"
              placeholder="Digite o Instagram da sua loja/empresa"
              error={errors?.instagram}
              success={!errors?.instagram && touched?.instagram}
            />

            <FormInput
              field="facebook"
              label="Facebook da loja/empresa"
              placeholder="Digite o Facebook da sua loja/empresa"
              error={errors?.facebook}
              success={!errors?.facebook && touched?.facebook}
            />
          </div>
        </>
      ) : (
        <>
          <div
            className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
          >
            <FormInput
              field="nome"
              label="Nome"
              placeholder="Digite seu nome"
              error={errors?.nome && touched?.nome}
              success={!errors?.nome && touched?.nome}
              required
            />

            <FormInput
              field="sobrenome"
              label="Sobrenome"
              placeholder="Digite seu sobrenome"
              error={errors?.sobrenome && touched?.sobrenome}
              success={!errors?.sobrenome && touched?.sobrenome}
              required
            />
          </div>

          <div
            className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
          >
            <FormInput
              field="genero"
              label="Gênero"
              error={errors?.genero && touched?.genero}
              success={!errors?.genero && touched?.genero}
              component="select"
              required
            >
              <option disabled selected value="">
                Selecione uma opção...
              </option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </FormInput>

            <FormInput
              field="cpf"
              label="CPF"
              placeholder="Digite seu CPF"
              error={errors?.cpf && touched?.cpf}
              success={!errors?.cpf && touched?.cpf}
              mask="999.999.999-99"
              required
            />
          </div>

          <div
            className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
          >
            <FormInput
              field="data_nascimento"
              label="Data de nascimento"
              placeholder="__/__/____"
              error={errors?.data_nascimento && touched?.data_nascimento}
              success={!errors?.data_nascimento && touched?.data_nascimento}
              mask="99/99/9999"
              required
            />

            <FormInput
              field="telefone"
              label="Telefone"
              placeholder="(__) 0000-0000"
              error={errors?.telefone && touched?.telefone}
              success={!errors?.telefone && touched?.telefone}
              mask="(99) 99999-9999"
              required
            />
          </div>

          <div
            className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
          >
            <FormInput
              field="site"
              label="Site da loja/empresa"
              placeholder="Digite o site da sua loja/empresa"
              error={errors?.site && touched?.site}
              success={!errors?.site && touched?.site}
            />
            <FormInput
              field="facebook"
              label="Facebook da loja/empresa"
              placeholder="Digite o Facebook da sua loja/empresa"
              error={errors?.facebook}
              success={!errors?.facebook && touched?.facebook}
            />
          </div>

          <FormInput
            field="instagram"
            label="Instagram da loja/empresa"
            placeholder="Digite o Instagram da sua loja/empresa"
            error={errors?.instagram}
            success={!errors?.instagram && touched?.instagram}
          />
        </>
      )}

      <FormStepRequiredText />

      <button
        className={`${handles.formStepNextButton} ${
          !isValid ? `${handles.formStepButtonDisabled}` : ''
        } ${
          loading || searchRVLoading ? `${handles.formStepButtonLoading}` : ''
        } flex items-center justify-center pointer bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer`}
        onClick={handleClick}
        type="button"
      >
        {loading ? (
          <Spinner color="currentColor" size="20" />
        ) : (
          <FormattedMessage id="store/b2b-form.next-button-text" />
        )}
      </button>

      {showError && (
        <div className={`${handles.formError} w-100 c-danger t-mini pt3`}>
          {isBusiness
            ? 'E-mail ou CNPJ já cadastrado! Entre em contato com a loja caso tenha dúvidas.'
            : 'E-mail ou CPF já cadastrado! Entre em contato com a loja caso tenha dúvidas.'}
        </div>
      )}

      {isLegalAge && isLegalAge !== 0 && isLegalAge < 18 && !isBusiness ? (
        <div className={`${handles.formError} w-100 c-danger t-mini pt3`}>
          Você precisa ter mais de 18 anos para realizar o cadastro! Entre em
          contato com a loja caso tenha dúvidas.
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default FormStepContentOne

// import React, { useEffect, useState } from 'react'
// import { FormattedMessage } from 'react-intl'
// import { useCssHandles } from 'vtex.css-handles'
// import { Spinner } from 'vtex.styleguide'

// import type { FormStepContentProps } from '../FormStep'
// import { CSS_HANDLES } from '../FormStep'
// import FormInput from '../FormInput'
// import FormStepRequiredText from '../FormStepRequiredText'
// import useSearchData from '../../hooks/useSearchData'

// const FormStepContentOne = ({
//   errors,
//   touched,
//   values,
//   isBusiness,
//   nextStep,
// }: FormStepContentProps) => {
//   const [loading, setLoading] = useState(false)
//   const [showError, setShowError] = useState(false)
//   const [clicked, setClicked] = useState(false)
//   const {
//     searchCLDocument,
//     searchCLData,
//     searchCLCalled,
//     searchCLLoading,
//     searchCLError,
//     searchRVDocument,
//     searchRVData,
//     searchRVCalled,
//     searchRVLoading,
//     searchRVError,
//   } = useSearchData()

//   const { handles } = useCssHandles(CSS_HANDLES)

//   const requiredFieldsPF = [
//     'email',
//     'nome',
//     'sobrenome',
//     'genero',
//     'cpf',
//     'data_nascimento',
//     'telefone',
//   ]

//   const requiredFieldsPJ = [
//     'razao_social',
//     'nome_fantasia',
//     'cnpj',
//     'ie',
//     'data_abertura',
//     'celular',
//     'telefone',
//   ]

//   const isValid = isBusiness
//     ? requiredFieldsPJ.every(
//         (field) => !errors?.[field] && touched?.[field] && values?.[field]
//       )
//     : requiredFieldsPF.every(
//         (field) => !errors?.[field] && touched?.[field] && values?.[field]
//       )

//   const handleClick = () => {
//     if (!isValid) {
//       return
//     }

//     searchCLDocument(values?.email, isBusiness ? values?.cnpj : values?.cpf)
//     setShowError(false)
//     setLoading(true)
//   }

//   useEffect(() => {
//     // console.log('== FORM searchCLData', searchCLData)
//     // console.log('== FORM searchCLLoading', searchCLLoading)
//     // console.log('== FORM searchCLError', searchCLError)
//     // console.log('== FORM searchCLCalled', searchCLCalled)

//     // console.log('teste')

//     if (searchCLLoading || !searchCLCalled || searchCLError) {
//       return
//     }

//     if (
//       searchCLData &&
//       searchCLData.documents &&
//       searchCLData?.documents?.length
//     ) {
//       setShowError(true)
//       setLoading(false)

//       return
//     }

//     searchRVDocument(
//       values?.email,
//       !isBusiness ? values?.cpf : null,
//       isBusiness ? values?.cnpj : null
//     )
//   }, [searchCLData, searchCLLoading, searchCLCalled, searchCLError])

//   useEffect(() => {
//     // console.log('== FORM searchRVData', searchRVData)
//     // console.log('== FORM searchRVLoading', searchRVLoading)
//     // console.log('== FORM searchRVError', searchRVError)
//     // console.log('== FORM searchRVCalled', searchRVCalled)

//     // console.log('teste')

//     if (searchRVLoading || !searchRVCalled || searchRVError) {
//       return
//     }

//     if (
//       searchRVData &&
//       searchRVData.documents &&
//       searchRVData?.documents?.length
//     ) {
//       setShowError(true)
//       setLoading(false)

//       return
//     }

//     setShowError(false)
//     setLoading(false)

//     setClicked(true)

//     if (!clicked) {
//       nextStep()
//     }

//     window.location.hash = '#step-2'
//   }, [searchRVData, searchRVLoading, searchRVCalled, searchRVError])

//   return (
//     <div
//       className={`${handles.formStepContent} ${handles.formStepContentOne} flex flex-column w-100 h-100 items-stretch justify-center`}
//     >
//       <FormInput
//         field="email"
//         label="Email"
//         placeholder="email@gmail.com"
//         type="email"
//         error={errors?.email && touched?.email}
//         success={
//           !errors?.email &&
//           touched?.email &&
//           values?.email &&
//           values?.email.length
//         }
//         required
//       />

//       {isBusiness ? (
//         <>
//           <div
//             className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
//           >
//             <FormInput
//               field="razao_social"
//               label="Razão social"
//               placeholder="Digite a razão social"
//               error={errors?.razao_social && touched?.razao_social}
//               success={!errors?.razao_social && touched?.razao_social}
//               required
//             />

//             <FormInput
//               field="nome_fantasia"
//               label="Nome fantasia"
//               placeholder="Digite o nome fantasia"
//               error={errors?.nome_fantasia && touched?.nome_fantasia}
//               success={!errors?.nome_fantasia && touched?.nome_fantasia}
//               required
//             />
//           </div>

//           <div
//             className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
//           >
//             <FormInput
//               field="cnpj"
//               label="CNPJ"
//               placeholder="Digite o CNPJ"
//               error={errors?.cnpj && touched?.cnpj}
//               success={!errors?.cnpj && touched?.cnpj}
//               mask="99.999.999/9999-99"
//               required
//             />

//             <FormInput
//               field="ie"
//               label="IE"
//               placeholder="Digite o IE"
//               error={errors?.ie && touched?.ie}
//               success={!errors?.ie && touched?.ie}
//               required
//             />
//           </div>

//           <div
//             className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
//           >
//             <FormInput
//               field="data_abertura"
//               label="Data de abertura"
//               placeholder="__/__/____"
//               error={errors?.data_abertura && touched?.data_abertura}
//               success={!errors?.data_abertura && touched?.data_abertura}
//               mask="99/99/9999"
//               required
//             />

//             <FormInput
//               field="celular"
//               label="Celular"
//               placeholder="(__) 0000-0000"
//               error={errors?.ie && touched?.ie}
//               success={!errors?.ie && touched?.ie}
//               mask="(99) 99999-9999"
//               required
//             />
//           </div>

//           <div
//             className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
//           >
//             <FormInput
//               field="telefone"
//               label="Telefone Comercial"
//               placeholder="(__) 0000-0000"
//               error={errors?.telefone && touched?.telefone}
//               success={!errors?.telefone && touched?.telefone}
//               mask="(99) 9999-9999"
//               required
//             />

//             <FormInput
//               field="site"
//               label="Site da loja/empresa"
//               placeholder="Digite o site da sua loja/empresa"
//               error={errors?.site && touched?.site}
//               success={!errors?.site && touched?.site}
//             />
//           </div>

//           <div
//             className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
//           >
//             <FormInput
//               field="instagram"
//               label="Instagram da loja/empresa"
//               placeholder="Digite o Instagram da sua loja/empresa"
//               error={errors?.instagram}
//               success={!errors?.instagram && touched?.instagram}
//             />

//             <FormInput
//               field="facebook"
//               label="Facebook da loja/empresa"
//               placeholder="Digite o Facebook da sua loja/empresa"
//               error={errors?.facebook}
//               success={!errors?.facebook && touched?.facebook}
//             />
//           </div>
//         </>
//       ) : (
//         <>
//           <div
//             className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
//           >
//             <FormInput
//               field="nome"
//               label="Nome"
//               placeholder="Digite seu nome"
//               error={errors?.nome && touched?.nome}
//               success={!errors?.nome && touched?.nome}
//               required
//             />

//             <FormInput
//               field="sobrenome"
//               label="Sobrenome"
//               placeholder="Digite seu sobrenome"
//               error={errors?.sobrenome && touched?.sobrenome}
//               success={!errors?.sobrenome && touched?.sobrenome}
//               required
//             />
//           </div>

//           <div
//             className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
//           >
//             <FormInput
//               field="genero"
//               label="Gênero"
//               error={errors?.genero && touched?.genero}
//               success={!errors?.genero && touched?.genero}
//               component="select"
//               required
//             >
//               <option disabled selected value="">
//                 Selecione uma opção...
//               </option>
//               <option value="Masculino">Masculino</option>
//               <option value="Feminino">Feminino</option>
//             </FormInput>

//             <FormInput
//               field="cpf"
//               label="CPF"
//               placeholder="Digite seu CPF"
//               error={errors?.cpf && touched?.cpf}
//               success={!errors?.cpf && touched?.cpf}
//               mask="999.999.999-99"
//               required
//             />
//           </div>

//           <div
//             className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
//           >
//             <FormInput
//               field="data_nascimento"
//               label="Data de nascimento"
//               placeholder="__/__/____"
//               error={errors?.data_nascimento && touched?.data_nascimento}
//               success={!errors?.data_nascimento && touched?.data_nascimento}
//               mask="99/99/9999"
//               required
//             />

//             <FormInput
//               field="telefone"
//               label="Telefone"
//               placeholder="(__) 0000-0000"
//               error={errors?.telefone && touched?.telefone}
//               success={!errors?.telefone && touched?.telefone}
//               mask="(99) 99999-9999"
//               required
//             />
//           </div>

//           <div
//             className={`${handles.formStepRow} flex flex-column flex-row-ns w-100 h-100 items-start justify-start`}
//           >
//             <FormInput
//               field="site"
//               label="Site da loja/empresa"
//               placeholder="Digite o site da sua loja/empresa"
//               error={errors?.site && touched?.site}
//               success={!errors?.site && touched?.site}
//             />
//             <FormInput
//               field="facebook"
//               label="Facebook da loja/empresa"
//               placeholder="Digite o Facebook da sua loja/empresa"
//               error={errors?.facebook}
//               success={!errors?.facebook && touched?.facebook}
//             />
//           </div>

//           <FormInput
//             field="instagram"
//             label="Instagram da loja/empresa"
//             placeholder="Digite o Instagram da sua loja/empresa"
//             error={errors?.instagram}
//             success={!errors?.instagram && touched?.instagram}
//           />
//         </>
//       )}

//       <FormStepRequiredText />

//       <button
//         className={`${handles.formStepNextButton} ${
//           !isValid ? `${handles.formStepButtonDisabled}` : ''
//         } ${
//           loading || searchCLLoading || searchRVLoading
//             ? `${handles.formStepButtonLoading}`
//             : ''
//         } flex items-center justify-center pointer bg-action-primary b--action-primary c-on-action-primary hover-bg-action-primary hover-b--action-primary hover-c-on-action-primary pointer`}
//         onClick={handleClick}
//         type="button"
//       >
//         {loading ? (
//           <Spinner color="currentColor" size="20" />
//         ) : (
//           <FormattedMessage id="store/b2b-form.next-button-text" />
//         )}
//       </button>

//       {showError && (
//         <div className={`${handles.formError} w-100 c-danger t-mini pt3`}>
//           {isBusiness
//             ? 'E-mail ou CNPJ já cadastrado! Entre em contato com a loja caso tenha dúvidas.'
//             : 'E-mail ou CPF já cadastrado! Entre em contato com a loja caso tenha dúvidas.'}
//         </div>
//       )}
//     </div>
//   )
// }

// export default FormStepContentOne
