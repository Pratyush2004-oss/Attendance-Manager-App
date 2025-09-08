// components/AppText.js

import React from "react";
import { Text } from "react-native";

// This component acts as your new default Text element.
export function AppText({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  // Define your default styles here.
  const defaultClasses = "font-sans font-black";

  return (
    // Apply the default classes first, then any additional classes.
    <Text className={`${defaultClasses} ${className}`} {...props}>
      {children}
    </Text>
  );
}
