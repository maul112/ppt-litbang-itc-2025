"use client";

import { GlowingEffect } from "@/components/ui/GlowingEffect";

interface IntroductionSectionData {
  icon: React.ReactNode;
  title?: string | string[];
  description?: string | string[];
  isList?: boolean;
  isTable?: boolean;
  tableData?: React.ReactNode;
}

export const IntroductionSection = ({ data }: { data: IntroductionSectionData[] }) => {
  return (
    <ul className="snap-start grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:grid-rows-2 h-screen px-10 py-10">
      <GridItem area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]" icon={data[0]["icon"]} title={data[0]["title"]} description={data[0]["description"]} />

      <GridItem area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]" icon={data[1]["icon"]} title={data[1]["title"]} description={data[1]["description"]} />

      <GridItem area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]" icon={data[2]["icon"]} title={data[2]["title"]} description={data[2]["description"]} />

      <GridItem area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]" icon={data[3]["icon"]} title={data[3]["title"]} description={data[3]["description"]} isList={data[3]["isList"] ? true : false} />

      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={data[4]["icon"]}
        title={data[4]["title"]}
        description={data[4]["description"]}
        isList={data[4]["isList"] ? true : false}
        isTable={data[4]["isTable"] ? true : false}
        tableData={data[4]["tableData"]}
      />
    </ul>
  );
};

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title?: string | string[];
  description?: string | string[];
  isList?: boolean;
  isTable?: boolean;
  tableData?: React.ReactNode;
}

const GridItem = ({ area, icon, title, description, isList = false, isTable = false, tableData }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2 ">{icon}</div>
            <div className="space-y-3">
              {title && <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">{typeof title == "string" ? title : title[0]}</h3>}
              {!isList ? (
                description && <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] md:text-[1.2rem]/[1.375rem]  text-black dark:text-neutral-400">{typeof description == "string" ? description : description[0]}</h2>
              ) : (
                <ul>
                  {typeof description == "string" &&
                    description.split("\n").map((item, index) => (
                      <li key={index} className="list-disc font-sans text-sm/[1.125rem] md:text-[1.2rem]/[1.375rem] text-black dark:text-neutral-400">
                        {item}
                      </li>
                    ))}
                </ul>
              )}
              {typeof title == "object" && typeof description == "object" && (
                <>
                  <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">{title[1]}</h3>
                  <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] md:text-[1.2rem] text-black dark:text-neutral-400">{description[1] ?? ""}</h2>
                </>
              )}
              {isTable && tableData && tableData}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
