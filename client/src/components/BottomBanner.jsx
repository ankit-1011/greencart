import React from 'react';
import { assets } from '../asset/assets';
import { features } from '../asset/assets';

export const BottomBanner = () => {
    return (
        <div className="relative mt-24 flex flex-col md:flex-row gap-8">
            <div>
                <img src={assets.bottom_banner_image} className="w-full hidden md:block" />
                <img src={assets.bottom_banner_image_sm} className="w-full md:hidden" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24 px-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-6">Why We Are the Best?</h1>
                    <div className="flex flex-col gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-4 mt-2">
                                <img src={feature.icon} alt={feature.title} className="md:w-11 w-9" />
                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold">{feature.title}</h3>
                                    <p className="text-gray-500/70 text-xs md:text-sm">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};