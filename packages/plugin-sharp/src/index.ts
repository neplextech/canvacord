import loadImageSharp from "./functions/loadImage";
import resizeImageSharp from "./functions/resize";

export default function CanvacordMiddleware() {
    return (pluginsManager: any) => {
        pluginsManager.register("@canvacord/plugin-sharp", {
            props: {
                resizeImage: resizeImageSharp,
                loadImage: loadImageSharp
            }
        });
    };
}

export { loadImageSharp as loadImage, resizeImageSharp as resizeImage };
