import moment from "moment"
import {useRouter} from "next/router"
import Image from "next/image"
import Carousel from "@/components/utils/Carousel";

export const VehicleDetails = ({Data}: any) => {
   const {
    VehicleTypeName,
    VehicleMakeName,
    RegistrationNo,
    DateRegistered,
    DateExpired,
    VehicleColour,
    CertificateNo,
    ChassisNo,
    EngineNo,
    EngineCapacity,
    NumberOfseat,
    VehicleUsageMode,
    VehicleValue,
    VehicleYearName

   } = Data;

   const router = useRouter()

    console.log("DATA:", Data)


    return (
        <main className="mt-10">
        <div>
          <p className="text-[#000] cursor-pointer hover:underline" onClick={() => router.push("/")}> 	&larr; Back</p>
        </div>



        <div className="vehicle_images mt-10">
             <Carousel DATA={Data} />
        </div>

        <div className="mt-5">

            <h2 className="font-bold text-[20px]">Car Details</h2>

        <div className="car_basic_info mb-4">
           <p className="mt-1"><span className="font-bold">Type:</span> {VehicleTypeName}</p>
            <p className="mt-1"><span className="font-bold">Make:</span> {VehicleMakeName}</p>  
            <p className="mt-1"><span className="font-bold">Color:</span> {VehicleColour}</p> 
            <p className="mt-1"><span className="font-bold">Mode:</span> {VehicleUsageMode}</p>             
            <p className="mt-1"><span className="font-bold">Value:</span> {VehicleValue}</p>
            <p className="mt-1"><span className="font-bold">Year:</span> {VehicleYearName}</p>

           </div>


            <hr />
        <div className="car_basic_info my-4">
           <p className="mt-1"><span className="font-bold">Registered on:</span> {moment(DateRegistered).format('Do of MMMM, YYYY')}</p>
            <p className="mt-1"><span className="font-bold">Expiry Date:</span> {moment(DateExpired).format('Do of MMMM, YYYY')}</p>  
            <p className="mt-1"><span className="font-bold">Registration No: </span> {RegistrationNo}</p>       
            {/* <p className="mt-1"><span className="font-bold">Certificate No:</span> {CertificateNo}</p>
            <p className="mt-1"><span className="font-bold">Chassis No:</span> {ChassisNo}</p> */}
           </div>

           <hr />

           <div className="car_basic_info my-4">
           <p className="mt-1"><span className="font-bold">Engine No:</span> {EngineNo}</p>
            <p className="mt-1"><span className="font-bold">Engine Capacity:</span> {EngineCapacity}</p>  
            <p className="mt-1"><span className="font-bold">Number of Seat: </span> {NumberOfseat}</p>       
            <p className="mt-1"><span className="font-bold">Certificate No:</span> {CertificateNo}</p>
            <p className="mt-1"><span className="font-bold">Chassis No:</span> {ChassisNo}</p>
           </div>
           
        </div>


        </main>
    )
}