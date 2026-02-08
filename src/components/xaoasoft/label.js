import React from 'react'
import PropTypes from 'prop-types'

const Label = (props) => {
    const getDate  = new Date().getFullYear();
    return (
        <footer id="sitefooter" className="aux-site-footer">
            <div className="aux-wrapper aux-float-layout aux-desktop">
                <div className="aux-container aux-fold aux-float-wrapper">    <div className="aux-logo aux-logo-footer aux-start aux-middle  aux-phone-off">
                    <a className="aux-logo-anchor " href="https://sc.aetpk.com/" title="Advanced Equipment Technology" rel="home">
                    </a>
                </div>
                    <div id="copyright" className="aux-copyright aux-start aux-middle "><small>© {getDate} Developed By <a href="https://www.wasily.net">Wasily Technology.</a> </small></div><section className="widget-socials aux-socials-container aux-end aux-middle  aux-tablet-off aux-phone-off aux-socials-footer aux-horizontal aux-small">
                    </section>
                </div>
            </div>
        </footer>
    )
}

Label.propTypes = {}

export default Label