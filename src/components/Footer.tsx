import { NavList, Title } from "@/app/lib/constans";
import Link from "next/link";
import React, { Fragment } from "react";
import { Separator } from "./ui/separator";

function Footer() {
  return (
    <div className="border-t mt-6">
      <div className="container py-32 flex justify-between">
        <h2 className="text-2xl">
          <Link href="/">{Title}</Link>
        </h2>
        <div className="flex gap-10">
          {NavList.map((item, index) => {
            return (
              <Fragment key={item.title}>
                <div className="flex flex-col">
                  <span className="">{item.title}</span>
                  <div className="mt-4 flex flex-col gap-3">
                    {item.list.map((subItem) => {
                      return <span key={subItem}>{subItem}</span>;
                    })}
                  </div>
                </div>
                {index < NavList.length - 1 && (
                  <Separator orientation="vertical" />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Footer;
