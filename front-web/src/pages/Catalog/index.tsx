import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductsResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import ProductCardLoader from './Components/Loaders/ProductCardLoader';
import ProductCard from './Components/ProductCard';
import Pagination from 'core/components/Pagination';
import ProductFilters, { FilterForme } from 'core/components/ProductFilters';
import './styles.scss';



const Catalog = () => {

    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    const getProducts = useCallback((filter?: FilterForme) => {
        const params = {
            page: activePage,
            linesPerPage: 12,
            name: filter?.name,
            categoryId: filter?.categoryId,
        }
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage])

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <div className="catalog-container">
            <div className="d-flex justify-content-between">
                <h1 className="catalog-title">
                    Catalogo de produtos
                </h1>
                <ProductFilters onSearch={filter => getProducts(filter)} />
            </div>
            <div className="catalog-products">
                {isLoading ? <ProductCardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id}>
                            <ProductCard product={product} />
                        </Link>
                    ))
                )}
            </div>
            {productsResponse && (
                <Pagination
                    totalPages={productsResponse.totalPages}
                    activePage={activePage}
                    onChange={page => setActivePage(page)}
                />
            )}
        </div>
    );
};
export default Catalog;