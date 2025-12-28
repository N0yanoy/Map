import { Text } from "@radix-ui/themes";
import { ChipBox, ChipWrapper } from "./LocationChip.styles";

type Props = {
  lat: number;
  lng: number;
  align?: "start" | "center" | "end";
  compact?: boolean;
};

export const LocationChip = ({ lat, lng, align = "center" }: Props) => {
  const text = `📍 ${lat.toFixed(4)}° צפון, ${lng.toFixed(4)}° מזרח`;

  return (
    <ChipWrapper align={align}>
      <ChipBox>
        <Text size="3" color="blue" style={{ fontWeight: 900, letterSpacing: "0.1px" }}>
          {text}
        </Text>
      </ChipBox>
    </ChipWrapper>
  );
};
