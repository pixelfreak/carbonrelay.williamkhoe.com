import css from '../styles/footer.module.scss';

export default function Footer() 
{
    return (
        <footer className={css.main}>
            <div className={css.content}>
                <a className={css.logo} href="/classes">
                    <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="Square Logo"/>
                </a>
            </div>
        </footer>
    );
}