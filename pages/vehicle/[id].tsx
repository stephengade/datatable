import { VehicleDetails } from "@/components/src/VehicleDetails/VehicleDetails"
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image"

const VehiclePage = ({registeredVehicleInfo}: any) => {
    const router = useRouter();
    const { id } = router.query;

  
  
    return (
        <div className="container px-4 mx-auto max-w-4xl">
        <VehicleDetails id={id} Data={registeredVehicleInfo[0]}/>
       
        </div>
    )
}

export default VehiclePage


export async function getStaticPaths() {
    // Fetch the IDs from the API endpoint
    const response = await axios.get(
      'https://apistaging.boiibonline.ng/api/VehiclePremiumPolicyHolder/GetByFirmId?FirmId=a9a4c543-f958-4bd0-8e24-41e1d0a111e0&PageNumber=1&PageSize=10'
    );
    const items = response.data.Items;
  
    // Generate the paths based on the fetched IDs
    const paths = items.map((item: { Id: any; }) => ({
      params: { id: item.Id },
    }));
  
    return {
      paths,
      fallback: true, // Set to false if you want to show a 404 page for non-existing IDs
    };
  }
  
  export async function getStaticProps({ params }: any) {
    const { id } = params;
  
    // Fetch the registered vehicle info based on the ID
    const response = await axios.get(
      `https://apistaging.boiibonline.ng/api/VehiclePremiumPolicyHolder/GetRegVehiclePolicyDetailsById?Id=${id}`
    );
    const registeredVehicleInfo = response.data.RegisteredVehicleInfoModel;
  
    return {
      props: {
        registeredVehicleInfo,
      },
      revalidate: 60, // Optional: You can set the revalidation interval for this page in seconds
    };
  }