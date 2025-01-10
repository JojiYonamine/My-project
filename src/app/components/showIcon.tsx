import Image from "next/image";
import React, { useEffect, useState } from "react";

interface showIconProps {
  src: string | null | undefined;
  size?: number;
  loading?: boolean;
}

const ShowIcon: React.FC<showIconProps> = ({
  src,
  size = 20,
  loading = false,
}) => {
  if (loading==true||!src)
    return (
      <Image
        src={"/icons/icon-no-user.png"}
        alt={"/icons/icon-no-user.png"}
        width={size}
        height={size}
      />
    );
  return (
    <Image
      src={src}
      alt={"/icons/icon-no-user.png"}
      width={size}
      height={size}
    />
  );
};

export default ShowIcon;
