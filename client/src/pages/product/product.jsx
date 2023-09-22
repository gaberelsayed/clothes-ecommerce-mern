import NavBar from "../../components/NavBar";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Footer from "../../components/Footer";
import { LeftContent } from "./LeftContent";
import { RightContent } from "./RightContent";

import { useProductContext } from "../../contexts/productContext";

const ProductPage = () => {
  const { products } = useProductContext();
  const { id } = useParams();

  // I've used this mock data to test Carousel
  // const data = {
  //   id: 1,
  //   title: "The short sleeve hawthrone",
  //   price: 300,
  //   description: `When it's colder than the far side of the moon and spitting rain
  //     too, you've still got to look good. From water-repellent leather
  //     to a rugged outsole, the Lunar Force 1 adapts AF-1 style, so you
  //     can keep your flame burning when the weather hits`,
  //   subtitle: `When it's colder than the far side of the moon and spitting rain
  //     too, you've still got to look good. From water-repellent leather
  //     to a rugged outsole, the Lunar Force 1 adapts AF-1 style, so you
  //     can keep your flame burning when the weather hits`,
  //   category: "In For Strip",
  //   rating: 4.3,
  //   reviews: 67,
  //   images: [
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0EsOLL1vAIy-GRJfzn7Q58VFzE2MPl3lBiA&usqp=CAU",
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMb-4kPw0nPxFlfbzl3DFD8JIehje6Ay-PTa_l_FK-j8N8ZQJTCA1DMki7TkTmqGGjubs&usqp=CAU",
  //     "data:image/jpeg;base64,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",
  //     "data:image/jpeg;base64,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",
  //     "https://cdn11.bigcommerce.com/s-405b0/images/stencil/590x590/products/71/18017/gildan-5000-tee-t-shirt.ca-antique-jade-dome__19096.1637746764.jpg?c=2",
  //     "https://static.pullandbear.net/2/photos//2023/I/0/2/p/7242/524/711/7242524711_2_6_8.jpg?t=1685029722736&imwidth=1125",
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYHDduyk-ZuhBVUgjdLWiRUqXZ6MDtFOmFJCICQ6BSTpdSNIal-NHymrumfqqW12z_fZ0&usqp=CAU",
  //     "data:image/jpeg;base64,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",
  //     "data:image/jpeg;base64,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",
  //     "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIUAhQMBIgACEQEDEQH/xAAbAAADAAMBAQAAAAAAAAAAAAAAAQIDBgcFBP/EAEEQAAIBAgMEBgUHCwUAAAAAAAABAgMEBREhBhIxQQciUVJhgRNxkbHSYpShosHR8BQVMjNDU1WjwuLxFhcjJEL/xAAYAQEAAwEAAAAAAAAAAAAAAAAAAQMEAv/EAB4RAQACAgIDAQAAAAAAAAAAAAABAgMRITITMVES/9oADAMBAAIRAxEAPwD6xgMytZDAAAYAADBDAQx5ZevsQAABkPIALihJFxQFRRliiYoyxQDSGUgCHjDEMJAwQAMEMAAZFetSt6Mq1xUhSpQWcpzlkl5nlW21GC1KdW4qXkKdGjPd/wCXquo8v/MeLQtuI3pMREzrb2ovKLfl7UxHlPbHAZUn/wB2jvN/pPeUvVlkJY9hlH0G9eUpUa8nGlWhLejnp1ZPlx5lVMlrW1NdLL0rEbi23rjSBIZcqNGSKJijJFAXFGSKJijLFBBpAUkAHhDEmMJNDQkMgNampbRbXVLK6q2WG0qcqtN7s69TWKfNJLjlw15o9LazGfzThzjQmleV840fk9svLP25HMc+s8234vmX4se+ZUZcmuIfRfXt3iFX0l9cVK8k9N96R9S4LyMGXWUuaGI06hm3ztu2LdId9imDVsPq2lCEq9H0NWvGpJ70dE8o8uD5s0nJZtpLN8X2iaXYNIiKxHpM2mXq4NtFiOD5Qt6vpbdcaFXWKXye75aeB0LZ7aGzx2Eo0VOlcU1nUoz1yXanzX4yRyg+vBsQq4XiFG+o5t0pdaKf6ceEo+a+nI4vjiYd0yTE8u0RRkijDaVqV1bUri3mp0qsFOElzT4H0xRka1RRkSJijIkBSQDSAI21xFEJlIOlIxXt5QsbSpdXM1ClTWbfb4LxZlRoO311eVL+na1aUqdnDrUpPWNWWWsvLhl58zqlf1OnN7fmNvDxbEq2K39S7r6b2kIdyHJfjnmfDH9Z5FcxR/WN9iNsRqGGZ3ytcAFnoHIlAAQZgPmKi9ENMilpl5+8Jb70c4yoVHg9xLqyzqWzb4PjKHvkvM6FFHCKVWpRqwrUJunWpyU6c1xjJapnZ9nMWp43hVK9ppRm+rVp9youK+1eDRly11O2nDbcal6kTJFEpGSKKVpoCkgA1dFEIoOlIxX1nbX9rK2u6UatKXJ8n2p8n4mVFIDmWP7MXuEz9JRU7q0b0qQhnKPhJL3rR+HAxYjgdbC8Mtrq8zhXuptKi/2cUtM/F/QdTWhpvSPNZYdT5v0kvZur7TRjyTMxEs98VaxMtKXABDNDMBDDIBH3XGC31vhtpiMaUq1tcpuMqcW3CW81utcuGj5nxHXthZb2ythlyU19eRXktNY2sx1/U6aZszsNiGJblzjEp2Vq9VQjpVmvHu+/wR0+ws7ewtadrZ0Y0aNNZRhFaf58TIkZImW1ps01rFfSki0hJFo5dGgGkMIaki0QikHakUQigKNH6RXne2C7tGb9rX3G8I0PpClnilrHu2+ftkyzF3VZujVBhzGbGMmAMOQAdY6O5b+ytt8mpVX12coOodGFTf2cqx/d3dSH1Yy/qKs3Vdh7NvSLiiUjJFGRpUkWiUi0EGkBSQgNQRS0JKRDtSGShokWmc/29lnjkF2W8ffI6AvA5ztvLe2gqru04L1aZ/aW4eynN1eBzY+JL0ZUdTWyJkPkE+AlwQFHS+inXAr1dl9J/wAumc0Oj9E088NxKn3bpS9sF9xVm6rcXZvaRaFEpGVpUi0iUWgKQDQAaWmWjGmWmcu1DRJSJFLM1zGNlPzpiVW7/LvRKoorcVLeyySXHNdhsSZSZMWms7hFqxaNS1H/AEDTlxxSp83XxFR2Ap/xSfzdfEbemZYnXkv9ceKnxp3+3lOS1xWfzdfEZIdHFLLTFqmfjbr4jc4memifJb6jx1+NEl0bzb6mLRy8bb+42TZDZp7O0rqErv8AKHcSjJtU9zLJetnuxMkSJvaeJTFKx6XFFpEpFxRyk0i0JIpAMBgBo6LQAcu1DQASGtC0AEC4maAAShngZ4ABKGaJliIAhkRcQAC0UgABgAAf/9k=",
  //   ],
  // };

  const [data, setData] = useState();

  useEffect(() => {
    if (products) {
      const currentProduct = products.find((product) => product._id === id);
      setData(currentProduct);
    }
  }, [products]);

  return (
    <>
      <NavBar />
      {data ? (
        <div className="product_detail flex flex-col mx-4 mt-4 mb-10 font-Poppins md:flex-row xl:mx-32 xl:mt-8">
          <LeftContent data={data} />
          <RightContent data={data} />
        </div>
      ) : (
        <div className="text-5xl h-[50vh] text-center">
          Product Does not exist
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProductPage;
