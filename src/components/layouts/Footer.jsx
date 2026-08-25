import React from "react";
import { BiX } from "react-icons/bi";
import { BsGithub, BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";

const Footer = () => {
  const CompanyNav = ["About us", "Careers", "Store Locations", "Our Blog", "Reviews"];
  const ShopNav = ["Game & Video", "Phone &Tablets", "Computers & Laptop", "Sport Watches", "Events"];
  const SupportNav = ["FAQ", "Reviews", "Contact Us", "Shipping", "Live chat"];

  return (
    <div>
      <footer className="bg-neutral-100 min-h-[300px] p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-10">
          <div className=" col-span-2 lg:col-span-1">
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-800">
            SparkCart
            </h3>
            <p className="text-sm mt-4 md:mt-6 text-neutral-500">
              We have clothes that suits your style and which you’re proud to wear. From women to men.
            </p>
            <div className="flex gap-3 mt-5 md:mt-9  mb-2">
                <span><FaFacebook/></span>
                <span><BsInstagram/></span>
                <span><BiX/></span>
                <span><BsGithub/></span>
            </div>
          </div>

          <FooterNav title={"Company"} navData={CompanyNav} />
          <FooterNav title={"Shop"} navData={ShopNav} />
          <FooterNav title={"Support"} navData={SupportNav} />
        </div>
      </footer>
    </div>
  );
};

const FooterNav = ({ title, navData }) => {
  return (
    <div className="text-sm  md:text-base ">
      <h5 className="text-neutral-800 mb-4 tracking-[1.8px] uppercase"> {title} </h5>
      <ul className="text-neutral-500 space-y-5">
        {navData.map((item, i) => ( <li key={i}>{item}</li>))}
      </ul>
    </div>
  );
};

export default Footer;
