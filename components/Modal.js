const Modal = ({ setLoading, text, connect, noClaim }) => {
  return (
    <div className="sc-10w4fic-0 iNrGkc" data-reach-dialog-overlay="" style={{"opacity": "1"}}>
      <div aria-modal="true" role="dialog" tabIndex="-1" aria-label="dialog" className="sc-10w4fic-1 gbgIcR"
        data-reach-dialog-content="">
        <div className="sc-14qjb4a-2 bEDRLq">
          <div className="sc-14qjb4a-5 fryHeF">
            <div className="sc-14qjb4a-0 dXdxpE"><svg onClick={() => {setLoading(false)}} xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" className="sc-14qjb4a-1 iIWXBI">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg></div>
            <div className="sc-14qjb4a-4 dLcVOO">
              <div className="sc-1r2yyln-2 hjgYbB">
                <div className="sc-lk2f3n-0 jRUdVf">
                  <div className="sc-lk2f3n-2 koFacx">
                    <div className="sc-lk2f3n-4 dXJqwn">
                      <div className="sc-5lu8um-0 fujQLP css-pg28sj">
                        <div className="sc-lk2f3n-1 hgHsiD">{!noClaim && <svg viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="sc-1wahqvd-0 eMYdoQ">
                            <path
                              d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5"
                              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>}</div>{text}
                      </div>
                    </div>
                  </div>
                </div>

                {(connect && <div className="sc-bdnxRM sc-1uwbc25-0 sc-1uwbc25-1 fzUdiI bEmhkE MMogG">
                  <div className="sc-bdnxRM sc-u7azg8-0 sc-u7azg8-3 fzUdiI kpoZKP RQriX" style={{"flexWrap": "nowrap"}}>
                    <div className="sc-5lu8um-0 fujQLP css-xko237">By connecting a wallet, you agree to Uniswap Labs’ <a
                        target="_blank" rel="noopener noreferrer" href="https://uniswap.org/terms-of-service/"
                        className="sc-88web0-5 gjJqGP" style={{"textDecoration": "underline"}}>Terms of Service</a> and
                      acknowledge
                      that you have read and understand the Uniswap <a target="_blank" rel="noopener noreferrer"
                        href="https://uniswap.org/disclaimer/" className="sc-88web0-5 gjJqGP"
                        style={{"textDecoration": "underline"}}>Protocol Disclaimer</a>.</div>
                  </div>
                </div>)}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal