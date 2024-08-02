'use client'
import { ProductType } from "@/types/ProductType";
import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
    product: ProductType;
    fill?: boolean;
}

export default function ProductImage({product, fill}: ProductImageProps) {
    const [loading, setLoading] = useState(true);

    return fill ? (
        <Image 
            src={product.image} 
            fill 
            alt={product.title} 
            className={`object-cover ${loading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0' }`}
            onLoadingComplete={() => setLoading(false)}
        />
    ) : (
        <Image 
            src={product.image} 
            width={400}
            height={400}
            alt={product.title} 
            className={`object-cover ${loading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0' }`}
            onLoadingComplete={() => setLoading(false)}
        />
    )
}