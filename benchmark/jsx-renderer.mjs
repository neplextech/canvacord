import b from 'benny';
import { Builder, JSX, Font } from 'canvacord';

const geist = Font.loadDefault();

const builder = new Builder(800, 185);
builder.style = {
    display: 'flex',
    fontFamily: geist.name
};

builder.addComponent(
    JSX.createElement("div", {
        tw: "flex flex-col w-full h-full items-center justify-center bg-white",
        children: JSX.createElement("div", {
            tw: "bg-gray-100 flex w-full",
            children: JSX.createElement("div", {
                tw: "flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8",
                children: [
                    JSX.createElement("h2", {
                        tw: "flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left",
                        children: [
                            JSX.createElement("span", {
                                children: "Ready to dive in?"
                            }),
                            JSX.createElement("span", {
                                tw: "text-teal-600",
                                children: "Start your free trial today."
                            })
                        ]
                    }),
                    JSX.createElement("div", {
                        tw: "mt-8 flex md:mt-0",
                        children: [
                            JSX.createElement("div", {
                                tw: "flex rounded-md shadow",
                                children: JSX.createElement("a", {
                                    tw: "flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-5 py-3 text-base font-medium text-white",
                                    children: "Get started"
                                })
                            }),
                            JSX.createElement("div", {
                                tw: "ml-3 flex rounded-md shadow",
                                children: JSX.createElement("a", {
                                    tw: "flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-teal-600",
                                    children: "Learn more"
                                })
                            })
                        ]
                    })
                ]
            })
        })
    })
)


await b.suite(
    'JSX Renderer',
    b.add('Render SVG', async () => {
        await builder.build({
            format: 'svg'
        });
    }),
    b.cycle(),
    b.complete(),
)