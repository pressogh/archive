import React from "react";
import { Switch } from "@nextui-org/react";

const LeftMenu = ({ contentType, setContentType }) => {
    return (
        <div>
            <div className="lnb-border">
                <div className="lnb-item">
                    <div className="lnb-header">
                        <div>Line</div>
                        <Switch
                            checked={contentType}
                            onChange={() => {
                                setContentType(!contentType);
                            }}
                        />
                        <div>bar</div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .lnb-border {
                    display: flex;
                    justify-content: center;
                    width: 15vw;
                    height: 40vh;
                    background: white;
                    padding: 1vw;
                    border-radius: 3vmin;
                    box-shadow: 0 10px 50px -3px rgba(0,0,0,0.1);
                    margin: 15vh 5vw 0 0;
                }
                .lnb-item {
                    width: 100%;
                }
                .lnb-header {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid rgba(219, 219, 219, 1);
                    padding: 0 20% 20px 20%;
                    width: 100%;
                }
            `}</style>
        </div>
    );
};

export default LeftMenu;
