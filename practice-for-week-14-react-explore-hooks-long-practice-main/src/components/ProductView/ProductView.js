import { useState, useEffect } from 'react';
import React from 'react';
import ProductListItem from '../ProductListItem';
import ProductDetails from '../ProductDetails';
import './ProductView.css';

function ProductView({ products }) {
  // TODO: Replace with state variable
  const [sideOpen, setSideOpen] = useState(
    localStorage.getItem('sideOpen') === 'true' ? true : false
  );
  const [selectedProduct, setSelectedProduct] = useState(
    JSON.parse(localStorage.getItem('selectedProduct')) || ''
  );

  useEffect(() => {
    // console.log(`selectedProduct CHANGED TO`, selectedProduct);
    if (selectedProduct) setSideOpen(true);

    localStorage.setItem(
      'selectedProduct',
      JSON.stringify(selectedProduct)
    );
  }, [selectedProduct]);

  useEffect(() => {
    // console.log(`sideOpen CHANGED TO`, sideOpen);
    if (!sideOpen) setSelectedProduct('');
    localStorage.setItem('sideOpen', sideOpen);
  }, [sideOpen]);

  return (
    <div className='product-view'>
      <div className='product-main-area'>
        <h1>Products</h1>
        <div className='product-list'>
          {products.map((item) => (
            <ProductListItem
              key={item.id}
              product={item}
              onClick={() => setSelectedProduct(item)}
              isSelected={selectedProduct.id === item.id}
            />
          ))}
        </div>
      </div>
      <div className='product-side-panel'>
        <div className='product-side-panel-toggle-wrapper'>
          <div
            className='product-side-panel-toggle'
            onClick={() => setSideOpen(!sideOpen)}
          >
            {sideOpen ? '>' : '<'}
          </div>
        </div>
        <ProductDetails
          visible={sideOpen}
          product={selectedProduct}
        />
      </div>
    </div>
  );
}

export default ProductView;
