import Head from 'next/head'
import Layout from '../../components/layout';
import css from '../../styles/create-list.module.scss';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import { useLists } from '../../lib/tmdb';

const TextInput = ({ placeholder, ...props }) => 
{
	const [field, meta] = useField(props);
	return (
		<div className="form-group">
			<div className={`input-group ${meta.touched && meta.error ? 'error' : ''}`}>
                <label className="input-group-text" htmlFor={props.id}>{placeholder}</label>
				<input {...field} {...props} />
			</div>
		</div>
	);
};

export default function CreateList()
{
    const { createList } = useLists();

    return (
        <Layout>
            <Head>
                <title>Create List - The Movie DB</title>
            </Head>

            <section className={css['create-list']}>
                <div className={css['content']}>
                    <header>
                        <h2>Create a new list</h2>
                    </header>
                    <div className={css['form-content']}>
                        <Formik initialValues={{name: ''}}
                            validationSchema={Yup.object(
                            {
                                name: Yup.string().required('Required'),
                            })}
                            onSubmit={ async (values, { resetForm, setStatus }) =>
                            {
                                let newList;
                                try
                                {
                                    // await new Promise(resolve => setTimeout(resolve, 5000));
                                    newList = createList(values.name);
                                }
                                catch(e)
                                {
                                    return;
                                }

                                setStatus({success: 'Success!'});

                                // Redirect to this list
                                Router.push(`/list/${newList.id}`);
                            }}
                            >
                            { ({ isSubmitting, status }) => (
                                <Form className={`${(isSubmitting ? 'loading' : '')} ${(status && status.success ? 'success' : '')}`}>
                                    <TextInput id="input-name" name="name" type="text" placeholder="Name" />
                                    <div className="action">
                                        <button className="btn" type="submit">
                                            <span className="text">Create</span>
                                            <span className="spinner">
                                                <span className="bounce1"></span>
                                                <span className="bounce2"></span>
                                                <span className="bounce3"></span>
                                            </span>
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
