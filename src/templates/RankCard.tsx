import { JSX } from "../helpers/jsx";
import { Builder } from "./Builder";

interface RankCardUsername {
  value: string;
  color: string;
  size: string;
  x: number;
  y: number;
}

export class RankCard extends Builder {
  public setUsername(username: RankCardUsername) {
    this.addText({
      color: username.color,
      data: username.value,
      fontSize: username.size,
      x: username.x,
      y: username.y,
    });
  }

  public render() {
    return (
      <div
        style={{
          width: `${this.width}px`,
          height: `${this.height}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1A1A23",
        }}
      >
        {this.components.map((component) => {
          return component.toElement();
        })}
      </div>
    );
  }
}
