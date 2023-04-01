import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import { sanityClient } from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategory, setFeaturedCategory] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured"] {
          ...,
          restaurant[]->{
            ...,
            dishes[]->{
            ...
            }
          }
        }`
      )
      .then((res) => setFeaturedCategory(res));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-1">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Delivery Now</Text>
          <Text className="font-bold text-xl">
            Currenct Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={30} color="#00CCBB" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-0 pb-2 mx-4">
        <View className="flex-row flex-1 items-center space-x-2 bg-gray-200 p-3 mr-4">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants and Cuisines"
            keyboardType="default"
            className="w-full"
          />
        </View>

        <AdjustmentsHorizontalIcon color="#00CCBB" />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      >
        {/* Categories */}
        <Categories />
        {/* Featured */}
        {featuredCategory?.map((category) => (
          <FeaturedRow
            key={category?._id}
            id={category?._id}
            title={category?.name}
            desc={category?.short_description}
            featuredCategory="featured"
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
