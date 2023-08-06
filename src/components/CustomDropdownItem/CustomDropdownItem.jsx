import React from "react";
import { Dropdown } from "react-bootstrap";

const CustomDropdownItem = React.forwardRef(({ children, ...props }, ref) => (
    <Dropdown.Item as="a" href="#" ref={ref} {...props}>
        {children}
    </Dropdown.Item>
));

export default CustomDropdownItem;
