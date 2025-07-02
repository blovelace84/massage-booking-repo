import React from "react";

const services = [ "Swedish Massage", "Deep Tissue Massage", "Hot Stone Massage", "Aromatherapy Massage" ];

const ServiceSelector = ({ register }) => {
    return(
        <div>
            <label>Select Service:</label>
            <select {...register("service")}>
                {services.map((service) => (
                    <option value={service} key={service}>{service}</option>
                ))}
            </select>
        </div>
    );
}

export default ServiceSelector;