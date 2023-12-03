import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type {
  Documentation,
  DocumentedClass,
  DocumentedFunction,
  DocumentedTypes,
} from "micro-docgen";
import { HeadingMeta } from "../heading";
import { Function } from "./entities/Function";
import { ClassRenderer } from "./renderer/ClassRenderer";
import { TypeRenderer } from "./renderer/TypeRenderer";

interface IProps {
  data: Documentation["modules"][string];
}

export function ContentArea({ data }: IProps) {
  const router = useRouter();
  const { package: packageName, type, target, scrollTo } = router.query;
  const [currentItem, setCurrentItem] = useState<
    DocumentedClass | DocumentedTypes | DocumentedFunction | null
  >(() => {
    const t =
      type === "class"
        ? "classes"
        : type === "function"
        ? "functions"
        : type === "variables"
        ? "variable"
        : type === "enum"
        ? "enum"
        : "types";
    const res = data[t as Exclude<keyof typeof data, "name">] as unknown as {
      data: DocumentedClass | DocumentedTypes | DocumentedFunction;
    }[];
    const entity = res.find((e) => e.data.name === target)?.data || null;

    return entity;
  });

  useEffect(() => {
    const elm = document.getElementById(scrollTo as string);
    if (!elm) return;
    elm.scrollIntoView({ behavior: "smooth" });
  }, [scrollTo]);

  useEffect(() => {
    if (!packageName) return;
    if (!target || !type) {
      if (
        data.classes.length ||
        data.functions.length ||
        data.types.length ||
        data.variables.length ||
        data.enum.length
      ) {
        const t = data.classes.length
          ? "classes"
          : data.functions.length
          ? "functions"
          : data.variables.length
          ? "variable"
          : data.enum.length
          ? "enum"
          : "types";
        const resolvedType =
          t === "classes"
            ? "class"
            : t === "functions"
            ? "function"
            : type === "variable"
            ? "variable"
            : type === "enum"
            ? "enum"
            : "type";
        if (!type) {
          const dest = `/docs/${encodeURIComponent(
            packageName as string
          )}?type=${resolvedType}&target=${
            data[t as Exclude<keyof typeof data, "name">][0].data.name
          }${
            router.query.scrollTo ? `&scrollTo=${router.query.scrollTo}` : ""
          }`;
          return void router.replace(dest);
        }
      }
    } else {
      const t =
        type === "class"
          ? "classes"
          : type === "function"
          ? "functions"
          : type === "variable"
          ? "variables"
          : type === "enum"
          ? "enum"
          : "types";
      const res = data[t as Exclude<keyof typeof data, "name">] as unknown as {
        data: DocumentedClass | DocumentedTypes | DocumentedFunction;
      }[];

      const entity = res?.find((e) => e.data.name === target)?.data || null;
      setCurrentItem(entity);
    }
  }, [target, type, packageName, data]);

  // @ts-expect-error
  if (!currentItem || currentItem.__type !== type) return <></>;

  return (
    <>
      <HeadingMeta
        title={`${currentItem.name} | Canvacord`}
        description={`Documentation for ${currentItem.name}.`}
      />
      <div className="mb-16">
        {["enum", "type", "variable"].includes(type as string) ? (
          <TypeRenderer
            entity={currentItem as DocumentedTypes}
            type={type as any}
          />
        ) : type === "class" ? (
          <ClassRenderer entity={currentItem as DocumentedClass} />
        ) : type === "function" ? (
          <Function entity={currentItem as DocumentedFunction} />
        ) : null}
      </div>
    </>
  );
}
