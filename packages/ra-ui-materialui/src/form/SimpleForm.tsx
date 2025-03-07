import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Form, FormProps } from 'ra-core';
import { Stack, CardContent, SxProps, StackProps } from '@mui/material';
import { Toolbar } from './Toolbar';

/**
 * Form with a one column layout, one input per line.
 *
 * Pass input components as children.
 *
 * @example
 *
 * import * as React from "react";
 * import { Create, Edit, SimpleForm, TextInput, DateInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton } from 'react-admin';
 * import RichTextInput from 'ra-input-rich-text';
 *
 * export const PostCreate = (props) => (
 *     <Create {...props}>
 *         <SimpleForm>
 *             <TextInput source="title" />
 *             <TextInput source="teaser" options={{ multiline: true }} />
 *             <RichTextInput source="body" />
 *             <DateInput label="Publication date" source="published_at" defaultValue={new Date()} />
 *         </SimpleForm>
 *     </Create>
 * );
 *
 * @typedef {Object} Props the props you can use (other props are injected by Create or Edit)
 * @prop {ReactElement[]} children Input elements
 * @prop {Object} defaultValues
 * @prop {Function} validate
 * @prop {string} redirect
 * @prop {ReactElement} toolbar The element displayed at the bottom of the form, containing the SaveButton
 *
 * @param {Props} props
 */
export const SimpleForm = (props: SimpleFormProps) => {
    const {
        children,
        className,
        component: Component = DefaultComponent as any,
        sx,
        toolbar = DefaultToolbar,
        ...rest
    } = props;
    return (
        <Form {...rest}>
            <Component className={className} sx={sx}>
                <Stack alignItems="flex-start" {...sanitizeRestProps(props)}>
                    {children}
                </Stack>
            </Component>
            {toolbar !== false ? toolbar : null}
        </Form>
    );
};

SimpleForm.propTypes = {
    children: PropTypes.node,
    defaultValues: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    // @ts-ignore
    record: PropTypes.object,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    toolbar: PropTypes.oneOfType([PropTypes.element, PropTypes.oneOf([false])]),
    validate: PropTypes.func,
};

export interface SimpleFormProps
    extends Omit<FormProps, 'render'>,
        Omit<StackProps, 'onSubmit'> {
    children: ReactNode;
    className?: string;
    component?: React.ComponentType<any>;
    defaultValues?: any;
    toolbar?: ReactElement | false;
    sx?: SxProps;
}

const DefaultComponent = ({ children, sx, className }) => (
    <CardContent sx={sx} className={className}>
        {children}
    </CardContent>
);
const DefaultToolbar = <Toolbar />;

const sanitizeRestProps = ({
    children,
    className,
    component,
    defaultValues,
    onSubmit,
    record,
    resource,
    reValidateMode,
    sx,
    toolbar,
    validate,
    resolver,
    warnWhenUnsavedChanges,
    ...props
}: SimpleFormProps) => props;
