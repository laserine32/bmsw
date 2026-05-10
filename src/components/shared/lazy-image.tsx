"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
	src: string;
	alt: string;
	width: number;
	height: number;
	className?: string;
	priority?: boolean;
	placeholder?: "blur" | "empty";
	blurDataURL?: string;
	quality?: number;
	fill?: boolean;
	sizes?: string;
	onLoad?: () => void;
}

const LazyImage = ({
	src,
	alt,
	width,
	height,
	className = "",
	priority = false,
	placeholder = "empty",
	blurDataURL,
	quality = 75,
	fill = false,
	sizes,
	onLoad,
}: LazyImageProps) => {
	const [isVisible, setIsVisible] = useState(priority);
	const [isLoaded, setIsLoaded] = useState(false);
	const imgRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer: IntersectionObserver = new IntersectionObserver(
			([entry]: IntersectionObserverEntry[]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					if (imgRef.current) observer.unobserve(imgRef.current);
				}
			},
			{
				threshold: 0.1,
				rootMargin: "200px 0px",
			},
		);
		const el = imgRef.current;
		if (el) {
			observer.observe(el);
		}

		return () => {
			if (el) observer.unobserve(el);
		};
	}, []);

	const handleLoad = () => {
		setIsLoaded(true);
		onLoad?.();
	};

	return (
		<>
			<div ref={imgRef} className={cn(isLoaded ? "h-full" : "h-96", "w-full")}>
				<Image
					src={isVisible ? src : "/blank.svg"}
					// src={src}
					alt={alt}
					width={!fill ? width : undefined}
					height={!fill ? height : undefined}
					fill={fill}
					sizes={sizes}
					quality={quality}
					priority={priority}
					placeholder={placeholder}
					blurDataURL={blurDataURL}
					className={cn(`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`, className)}
					onLoad={handleLoad}
					loading={priority ? undefined : "lazy"}
				/>
			</div>
		</>
	);
};

export default LazyImage;
