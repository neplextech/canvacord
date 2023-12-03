import { inter } from "@/lib/constants";
import { Heading, Paragraph } from "@edge-ui/react";
import type { DocumentedTypes } from "micro-docgen";
import { EntitySymbol } from "../entities/EntitySymbol";
import { ParameterTable } from "../entities/ParameterTable";
import { Properties } from "../entities/Properties";
import { Type } from "../entities/Type";

export function TypeRenderer({
  entity,
  type,
}: {
  entity: DocumentedTypes;
  type: "interface" | "variable" | "enum";
}) {
  return (
    <>
      <EntitySymbol
        type={type}
        id={`c-${entity.name}`}
        link
        source={entity.metadata?.url}
      >
        {entity.name}
      </EntitySymbol>
      {entity.description ? (
        <Paragraph>
          <pre className={inter.className}>{entity.description}</pre>
        </Paragraph>
      ) : null}
      {entity.properties.length ? (
        <div className="flex flex-col gap-4 mt-5">
          <Heading.H3>Properties</Heading.H3>
          {entity.properties.map((property) => (
            <Properties entity={property} key={property.name} />
          ))}
        </div>
      ) : null}
      <ParameterTable parameters={entity.parameters} />
      {!entity.properties.length && entity.type ? (
        <div className="my-2">
          <Type types={[entity.type]} prefix="Type:" />
        </div>
      ) : null}
    </>
  );
}
