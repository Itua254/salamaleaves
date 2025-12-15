import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
    email?: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

export const WelcomeEmail = ({
    email = "tea-lover@example.com",
}: WelcomeEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Welcome to the Salam Tea Leaves family! 🌿</Preview>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                primary: "#0A5F38",
                                secondary: "#A87C55",
                                background: "#F9F6F2",
                            },
                        },
                    },
                }}
            >
                <Body className="bg-background font-sans my-auto mx-auto px-2">
                    <Container className="border border-solid border-[#d4c5a9] rounded my-[40px] mx-auto p-[20px] max-w-[465px] bg-white">
                        <Section className="mt-[32px]">
                            <Heading className="text-primary text-[24px] font-normal text-center p-0 my-[30px] mx-0 font-serif">
                                Salam Tea Leaves
                            </Heading>
                        </Section>

                        <Heading className="text-primary text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            Welcome to the Club!
                        </Heading>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Hello there,
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            Thank you for subscribing to the Salam Tea Leaves newsletter. We are thrilled to have you join our community of tea lovers.
                        </Text>

                        <Text className="text-black text-[14px] leading-[24px]">
                            You'll be the first to know about our:
                        </Text>

                        <ul className="text-black text-[14px] leading-[24px]">
                            <li>New herbal blend launches</li>
                            <li>Exclusive discounts and offers</li>
                            <li>Health & wellness tips</li>
                            <li>Stories from our Turkana origins</li>
                        </ul>

                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Link
                                className="bg-primary rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                                href={`${baseUrl}/shop`}
                            >
                                Browse Our Teas
                            </Link>
                        </Section>

                        <Text className="text-gray-500 text-[12px] leading-[24px] mt-[32px]">
                            If you have any questions, feel free to reply to this email. We'd love to hear from you.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default WelcomeEmail;
