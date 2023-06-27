import React from 'react';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container-fluid'>
        <div className='row align-items-center'>
          <div className='col-6'>
            <span className='footer-text'>MY products shown</span>
          </div>
          <div className='col-6'>
            <nav aria-label='Pagination' className='pagination-container'>
              <ul className='pagination justify-content-end'>
                <li className='page-item'>
                  <a className='page-link' href='#previous'>Previous</a>
                </li>
                <li className='page-item'>
                  <a className='page-link' href='#1'>1</a>
                </li>
                <li className='page-item'>
                  <a className='page-link' href='#2'>2</a>
                </li>
                <li className='page-item'>
                  <a className='page-link' href='#3'>3</a>
                </li>
                <li className='page-item'>
                  <a className='page-link' href='#next'>Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
