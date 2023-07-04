try {
  $(function () {
    try {
      var CheckoutCustom = {
        init: function () {
          CheckoutCustom.addStepActiveClass()
          CheckoutCustom.appendFont()
          // CheckoutCustom.vCustomCheckout()
          CheckoutCustom.i18n()
        },
        i18n: function () {
          var intervalLang = setInterval(function () {
            if (vtex.i18n['pt-BR'] !== undefined) {
              clearInterval(intervalLang)
              vtex.i18n['pt-BR'].totalizers.couponCode = 'Código de Cupom'
              vtex.i18n.init()
            }
          }, 200)
        },
        vCustomCheckout: function () {
          var intervalCustomCheckout = setInterval(function () {
            if (
              window.vcustom !== undefined &&
              window.vcustom &&
              window.vcustom.checkout &&
              window.vcustom.checkout.lang
            ) {
              clearInterval(intervalCustomCheckout)
              window.vcustom.checkout.lang.eachLabel = 'cada'
              window.vcustom.checkout.lang.cartSubmitButton = 'Finalizar Compra'
              window.vcustom.checkout.enchancementTotalPrice = function (e) {
                const _this = this

                if (this.quantityPriceCart) {
                  try {
                    $.each(e.items, function (o) {
                      const a = $(`.table.cart-items tbody tr.product-item:eq(${o})`)
                      if (1 === this.quantity || 0 === a.find('td.product-price').find('.best-price').length) return
                      const n = a.find('.total-selling-price:eq(0)').text(),
                        t = `
          <div class="v-custom-quantity-price vqc-ldelem">
            <span class="v-custom-quantity-price__list">
              ${
                this.listPrice > this.sellingPrice
                  ? `<span class="v-custom-quantity-price__list--list">${e.storePreferencesData.currencySymbol} ${(
                      this.listPrice / 100
                    ).toFixed(2)}</span>`
                  : ''
              }
            </span>
          </div>
        `
                      a.find('td.product-price').find('.vqc-ldelem').remove(),
                        a
                          .find('td.product-price')
                          .addClass('v-custom-quantity-price-active')
                          .prepend(t)
                          .append(
                            `<div class="v-custom-quantity-price vqc-ldelem"><span class="v-custom-quantity-price__best">${n}</span></div>`
                          ),
                        a
                          .find('td.product-price')
                          .find('> .best-price')
                          .wrap('<div class="v-custom-quantity-price__list--selling"></div>'),
                        a
                          .find('td.product-price')
                          .find('.v-custom-quantity-price__list--selling')
                          .append(`<span class="vqc-ldelem">${_this.lang ? _this.lang.eachLabel : 'each'}</span>`)
                    })
                  } catch (e) {
                    console.error('enchancementTotalPrice error:', e)
                  }
                }
              }
              window.vcustom.checkout.init()
            }
          }, 200)
        },
        appendFont: function () {
          var style = document.createElement('style')
          var fontFacesRules =
            // insetir conteúdo do arquivo configs/font-faces.css aqui mudando a URL dos src para o caminho dos assets buildados da loja!
            `@font-face {
              font-display: swap;
              font-family: 'Ubuntu';
              font-style: normal;
              font-weight: 300;
              src: url('assets/fonts/Ubuntu-Light.woff') format('woff'),
                url('assets/fonts/Ubuntu-Light.ttf') format('truetype');
            }

            @font-face {
              font-display: swap;
              font-family: 'Ubuntu';
              font-style: normal;
              font-weight: 400;
              src: url('assets/fonts/Ubuntu-Regular.woff') format('woff'),
                url('assets/fonts/Ubuntu-Regular.ttf') format('truetype');
            }

            @font-face {
              font-display: swap;
              font-family: 'Ubuntu';
              font-style: normal;
              font-weight: 500;
              src: url('assets/fonts/Ubuntu-Medium.woff') format('woff'),
                url('assets/fonts/Ubuntu-Medium.ttf') format('truetype');
            }

            @font-face {
              font-display: swap;
              font-family: 'Ubuntu';
              font-style: normal;
              font-weight: 700;
              src: url('assets/fonts/Ubuntu-Bold.woff') format('woff'),
                url('assets/fonts/Ubuntu-Bold.ttf') format('truetype');
            }


        `
          style.appendChild(document.createTextNode(fontFacesRules))
          document.head.appendChild(style)
        },

        addStepActiveClass: function () {
          // Separando as urls necessárias
          const stepHashes = ['#/cart', '#/profile', '#/shipping', '#/payment', '#/confirmation']

          // ao carregar a pagina ele ativa o primeiro step com active
          $(window).on('load hashchange', function () {
            // Vamos pegar a hash para comparar os valores
            const hash = window.location.hash

            // para cada step conseguimos tratar as urls
            $('.checkout-steps_item').each(function (index) {
              // direcionado direto para a ordeplaced por isso fica undefined é outra pagina
              if ($(this).data('url') === undefined) return

              // CADA STEP
              const $checkoutStep = $(this)
              const stepUrl = $checkoutStep.data('url')
              const stepUrlFinal = stepUrl.split('/checkout/')[1].replace('#/', '')
              const $checkoutStepItem = $checkoutStep.addClass(`mz-step--${stepUrlFinal}`)

              if (stepHashes[index] === hash || (hash === '#/email' && stepHashes[index] === '#/profile')) {
                $checkoutStepItem.addClass('active')
              } else {
                $checkoutStepItem.removeClass('active')
              }
            })
          })
        },
      }

      CheckoutCustom.init()
    } catch (e) {
      typeof console !== 'undefined' && typeof console.error === 'function' && console.error('Erro:', e)
    }
  })
} catch (e) {
  typeof console !== 'undefined' && typeof console.error === 'function' && console.Error('Erro:', e)
}
