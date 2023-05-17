try {
  $(function () {
    try {
      var CheckoutCustom = {
        init: function () {
          CheckoutCustom.appendFont()
          CheckoutCustom.appendHeader()
          CheckoutCustom.appendFooter()
          CheckoutCustom.vCustomCheckout()
          CheckoutCustom.showShippingStep()
          CheckoutCustom.i18n()
          CheckoutCustom.addStepActiveClass()
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
        showShippingStep: function () {
          var intervalRedux = setInterval(function () {
            if (typeof store === 'undefined' || !store) {
              return
            }

            clearInterval(intervalRedux)

            window.vcustom.checkout.init()
          }, 200)
        },

        appendHeader: function () {
          $(
            '<header class="main-header"> <div class="container"> <div class="header-link"> <a href="/" title="Continuar comprand" class="buy-more-link link">Continuar comprando</a> <a href="/checkout/#/cart" title="voltar ao carrinho" class="back-cart-link link">Voltar para o carrinho</a> </div> <a href="/" title="Ir para a homepage" class="logo"> <img title="Logo" src="https://tfdfjz.vtexassets.com/assets/vtex/assets-builder/tfdfjz.store-theme/0.0.3/svg/logo-header-hover.svg" /> </a> </div> </header>'
          ).insertAfter('.header')
          $('.header').first().remove()
        },
        appendFooter: function () {
          $(
            `<footer class="main-footer">
            <div class="footer-container">
              <div class="container">
                <ul class="flags">
                  <li>
                    <input type="checkbox" id="pagamento" />
                    <label class="botao-colapse" for="pagamento">
                      <h2 class="payments footer-title">Formas de pagamento</h2>
                      <i></i>
                    </label>
                    <div class="flags-pagamento colapse">
                      <div class="line">
                        <img
                          title="Mastercard"
                          alt="Mastercard"
                          src="https://tfdfjz.vtexassets.com/assets/vtex/assets-builder/tfdfjz.store-theme/0.0.3/img/pagamento/MasterCard.png"
                        />
                        <img
                          title="Maestro"
                          alt="Maestro"
                          src="https://tfdfjz.vtexassets.com/assets/vtex/assets-builder/tfdfjz.store-theme/0.0.3/img/pagamento/Maestro.png"
                        />
                        <img
                          title="Elo"
                          alt="Elo"
                          src="https://tfdfjz.vtexassets.com/assets/vtex/assets-builder/tfdfjz.store-theme/0.0.3/img/pagamento/Elo.png"
                        />
                        <img
                          title="Visa"
                          alt="Visa"
                          src="https://tfdfjz.vtexassets.com/assets/vtex/assets-builder/tfdfjz.store-theme/0.0.3/img/pagamento/Visa.png"
                        />
                        <img
                          title="Caixa"
                          alt="Caixa"
                          src="https://tfdfjz.vtexassets.com/assets/vtex/assets-builder/tfdfjz.store-theme/0.0.3/img/pagamento/caixa.png"
                        />
                        <img
                          title="Itau"
                          alt="Itau"
                          src="https://tfdfjz.vtexassets.com/assets/vtex/assets-builder/tfdfjz.store-theme/0.0.3/img/pagamento/itau.png"
                        />
                        <img
                          title="Boleto"
                          alt="Boleto"
                          src="https://tfdfjz.vtexassets.com/assets/vtex/assets-builder/tfdfjz.store-theme/0.0.3/img/pagamento/Boleto.png"
                        />
                        <img
                          title="Pix"
                          alt="Pix"
                          src="https://tfdfjz.vtexassets.com/assets/vtex/assets-builder/tfdfjz.store-theme/0.0.3/img/pagamento/pix.png"
                        />
                        <img
                          title="Cielo"
                          alt="Cielo"
                          src="https://tfdfjz.vtexassets.com/assets/vtex/assets-builder/tfdfjz.store-theme/0.0.3/img/pagamento/Cielo.png"
                        />
                        <img
                          title="Amazon"
                          alt="Amazon"
                          src="https://tfdfjz.vtexassets.com/assets/vtex/assets-builder/tfdfjz.store-theme/0.0.3/img/pagamento/amazon.png"
                        />
                        <img
                          title="PayPal"
                          alt="PayPal"
                          src="https://tfdfjz.vtexassets.com/assets/vtex/assets-builder/tfdfjz.store-theme/0.0.3/img/pagamento/PayPal.png"
                        />
                      </div>
                      </div>
                    </li>
                    <li>
                      <input type="checkbox" id="seguranca" />
                      <label class="botao-colapse" for="seguranca">
                        <h2 class="security footer-title">Selos de segurança</h2>
                        <i></i>
                      </label>
                      <div class="flags-seguranca colapse">
                        <div class="line">
                          <img
                            title=""
                            alt="brasão"
                            class=""
                            src="https://tfdfjz.vtexassets.com/assets/vtex/assets-builder/tfdfjz.store-theme/0.0.3/img/seguranca/eureciclo.png"
                          />
                          <img
                            title=""
                            alt="brasão"
                            class=""
                            src="https://tfdfjz.vtexassets.com/assets/vtex/assets-builder/tfdfjz.store-theme/0.0.3/img/seguranca/ebit.png"
                          />
                          <img
                            title=""
                            alt="brasão"
                            class=""
                            src="https://tfdfjz.vtexassets.com/assets/vtex/assets-builder/tfdfjz.store-theme/0.0.3/img/seguranca/letsencrypt.png"
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                  <ul class="developed-powered">
                    <li class="powered">
                      <h6 class="title-dev-pow">Powered by</h6>
                      <img
                        title=""
                        alt=""
                        class=""
                        src="https://tfdfjz.vtexassets.com/assets/vtex/assets-builder/tfdfjz.store-theme/0.0.3/img/logo-vtex.png"
                      />
                    </li>
                    <li class="developed">
                      <h6 class="title-dev-pow">Developed by</h6>
                      <img
                        title=""
                        alt=""
                        class=""
                        src="https://tfdfjz.vtexassets.com/assets/vtex/assets-builder/tfdfjz.store-theme/0.0.3/img/logo-allegralar___eb527980c62e06cdf045118ef25cc127.png"
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <div class="cnpj">
                <div class="container">
                  <p>
                    ©${new Date().getFullYear()} KIKOS CALCADOS & CONFECCOES LTDA. Todos os direitos reservados. CNPJ
                    07.827.295/0004-66 <br /> Rua Campos Sales, 558, Centro Itapetininga/SP
                  </p>
                </div>
              </div>
            </footer>`
          ).insertAfter('.footer')
          $('.footer').first().remove()
        },
        addStepActiveClass: function () {
          const stepHashes = ['#/cart', '#/profile', '#/shipping', '#/payment', '#/confirmation']

          $(window).on('hashchange', function () {
            const hash = window.location.hash

            $('.checkout-steps_item').each(function () {
              if ($(this).data('url') === undefined) return
              const stepIndex = stepHashes.indexOf($(this).data('url').split('#')[1])

              if (hash === stepHashes[stepIndex]) {
                $(this).addClass('active')
              } else {
                $(this).removeClass('active')
              }

              if (stepIndex <= stepHashes.indexOf(hash)) {
                $(this).addClass('visited')
              } else {
                $(this).removeClass('visited')
              }
            })
          })
          $(window).on('load', function () {
            const hash = window.location.hash

            $('.checkout-steps_item').each(function () {
              if ($(this).data('url') === undefined) return
              const stepIndex = stepHashes.indexOf($(this).data('url').split('#')[1])

              if (hash === stepHashes[stepIndex]) {
                $(this).addClass('active')
              } else {
                $(this).removeClass('active')
              }

              if (stepIndex <= stepHashes.indexOf(hash)) {
                $(this).addClass('visited')
              } else {
                $(this).removeClass('visited')
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
