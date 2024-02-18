import React from "react";
import Image from "next/image";

import { EmptyData } from "../assets/images/index";
const EmptyDataPage = () => {
  return (
    <div className="empty">
      <div className="empty__content">
        <div className="empty__content--images">
          <Image src={EmptyData} alt="empty" />
        </div>
        <p>No Move found</p>
      </div>
    </div>
  );
};

export default EmptyDataPage;
