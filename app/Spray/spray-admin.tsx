import DefaultPageLayout from "@/components/layout/Default";
import { View } from "react-native";
import Spray from "@/components/layout/Spray";
import "react-native-gesture-handler";
import SprayAdmin from "@/components/layout/SprayAdmin";

const Index = () => {
  return (
    <DefaultPageLayout>
      <SprayAdmin />
    </DefaultPageLayout>
  );
};

export default Index;
