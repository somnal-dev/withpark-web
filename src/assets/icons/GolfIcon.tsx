interface GolfIconProps {
    size?: number;
    color?: string;
}

export const GolfIcon = ({
    size = 20,
    color = "#666666"
}: GolfIconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={`${size}px`} viewBox="0 -960 960 960" width={`${size}px`} fill={color}>
            <path d="M360-320q-83 0-141.5-58.5T160-520q0-83 58.5-141.5T360-720q83 0 141.5 58.5T560-520q0 83-58.5 141.5T360-320Zm0-80q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0-40q-33 0-56.5-23.5T280-520q0-33 23.5-56.5T360-600q33 0 56.5 23.5T440-520q0 33-23.5 56.5T360-440Zm400-280v400q0 33-23.5 56.5T680-240H160q-33 0-56.5-23.5T80-320v-320q0-17 11.5-28.5T120-680h520q17 0 28.5 11.5T680-640v40h120Zm-80 240h-40q-33 0-56.5-23.5T560-560v-80H160v320h520v-120Z"/>
        </svg>
    )
}
