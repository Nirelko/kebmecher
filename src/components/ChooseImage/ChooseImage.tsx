import React from 'react';
import styled from "styled-components";
import {Formik, Field, Form} from "formik";
import {observer} from "mobx-react";
import {useRootStore} from "../../providers/root-store.provider";

const Container = styled.div`
display: flex;
`;

function ChooseImage() {
    const {editorStore} = useRootStore();

    return (
        <Formik onSubmit={({imageUrl}) => editorStore.setImageSrc(imageUrl)} initialValues={{imageUrl: ''}}>
            <Form>
                <Container>
                    <Field name="imageUrl" placeholder="Your image url" style={{flex: 1}} type="text"/>
                    <button type="submit">Load</button>
                </Container>
            </Form>
        </Formik>
    );
}

export default observer(ChooseImage);