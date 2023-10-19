import React from 'react'
import { Helmet } from 'react-helmet'
import parse from 'html-react-parser'

interface Props {
  code: string
}

const Helmetizer = ({ code }: Props) => {
  console.log('code', code)
  let parsed = parse(code)
  console.log('parsed', parsed)

  let treatedParsed: JSX.Element[] = []

  if (parsed !== null) {
    if (Array.isArray(parsed)) {
      treatedParsed = parsed.map((item) => {
        if (item.type === 'script') {
          return (
            <script type="text/javascript" key="b2bcressi-helmetizer-script">
              {`${item.props.dangerouslySetInnerHTML.__html}`}
            </script>
          )
        }
        if (item.type === 'style') {
          return (
            <style type="text/css" key="b2bcressi-helmetizer-style">
              {`${item.props.dangerouslySetInnerHTML.__html}`}
            </style>
          )
        }
        return item
      })
    }
  }

  console.log('treatedParsed', treatedParsed)

  if (parsed !== null) {
    if (Array.isArray(parsed)) {
      for (let i = 0; i < parsed.length; i++) {
        if (parsed[i].type === 'script') {
          console.log(`parsed[${i}].props`, parsed[i].props)
          if (parsed[i].props.dangerouslySetInnerHTML) {
            console.log(
              `parsed[${i}].props.dangerouslySetInnerHTML`,
              parsed[i].props.dangerouslySetInnerHTML
            )
          }
        }
        if (parsed[i].type === 'link') {
          console.log(`parsed[${i}].props`, parsed[i].props)
        }
        if (parsed[i].type === 'style') {
          console.log(`parsed[${i}].props`, parsed[i].props)
          if (parsed[i].props.dangerouslySetInnerHTML) {
            console.log(
              `parsed[${i}].props.dangerouslySetInnerHTML`,
              parsed[i].props.dangerouslySetInnerHTML
            )
          }
        }
      }
    }
  }

  return (
    <>
      <Helmet>{treatedParsed}</Helmet>
    </>
  )
}

Helmetizer.schema = {
  title: 'admin/editor.helmetizer.title',
  description: 'admin/editor.helmetizer.description',
  type: 'object',
  properties: {
    code: {
      title: 'admin/editor.helmetizer.code.title',
      description: 'admin/editor.helmetizer.code.description',
      type: 'string',
      isLayout: false,
    },
  },
}

export default Helmetizer
