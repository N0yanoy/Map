import { Box, Text } from "@radix-ui/themes";

type Props = {
  lat: number;
  lng: number;
  align?: "start" | "center" | "end";
  compact?: boolean;
};

export const LocationChip = ({
  lat,
  lng,
  align = "center",
}: Props) => {
  const text = `📍 ${lat.toFixed(4)}° צפון, ${lng.toFixed(4)}° מזרח`;

  const justify =
    align === "start" ? "flex-start" : align === "end" ? "flex-end" : "center";

  return (
    <Box style={{ display: "flex", justifyContent: justify }}>
      <Box
        px="5"
        py="3"
        style={{
          width: "100%",
          maxWidth: 520,
          textAlign: "center",
          borderRadius: 999,
          background: "linear-gradient(180deg, var(--blue-2), var(--blue-1))",
          border: "1px solid var(--blue-6)",
          boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
        }}
      >
        <Text
          size="3"
          color="blue"
          style={{
            fontWeight: 900,
            letterSpacing: "0.1px",
          }}
        >
          {text}
        </Text>
      </Box>
    </Box>
  );
};
