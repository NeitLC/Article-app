import React, {useEffect} from "react";
import Article from "./Article";
import { useDispatch, useSelector } from "react-redux";
import { fetchWebSocketData } from "../redux/articleSlice";
import article1 from '../images/article-1.jpg';
import article2 from '../images/article-2.jpg';

export default function ArticleList() {
    const articles = [
        {
            title: 'Article 1',
            text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit erat eu velit convallis, eget gravida turpis semper. Sed sit amet aliquam leo. Aenean vel consequat felis, a pharetra metus.' 
            + 'In volutpat in enim id vestibulum. Nunc vel ante pretium, euismod elit non, sodales ante. Curabitur pellentesque, risus auctor varius convallis, magna risus varius mi, ut pretium arcu mi id turpis. Cras tempus sit amet ante sed mollis.' 
            + 'Pellentesque placerat nisl id magna sollicitudin volutpat. Morbi suscipit non nibh a accumsan. Vestibulum porttitor ante in odio vehicula lobortis. Nulla lacus orci, dapibus non tellus eu, mollis luctus metus. In vitae congue elit.'
            + 'Duis diam leo, varius ac feugiat ac, dictum quis nisi. Nullam blandit dictum facilisis. Proin tincidunt turpis in ipsum rhoncus porta. Vivamus quis tellus accumsan, sollicitudin est sit amet, dapibus diam. Ut commodo dolor ac nunc luctus, ac viverra est placerat.' 
            + 'Fusce consectetur lacinia rhoncus. Vivamus sed nunc quis massa gravida pulvinar. Donec non turpis quis tortor sodales tincidunt eget vel velit. Nulla blandit, lacus ac suscipit porttitor, est tortor dapibus erat, non euismod metus neque vel quam.' 
            + 'Nunc vulputate porttitor erat nec luctus.',
            image: article1,
            tags: ['tag1', 'tag2', 'tag3', 'tag4'],
            rating: 4,
        },
        {
            title: 'Article 2',
            text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit erat eu velit convallis, eget gravida turpis semper. Sed sit amet aliquam leo. Aenean vel consequat felis, a pharetra metus.' 
            + 'In volutpat in enim id vestibulum. Nunc vel ante pretium, euismod elit non, sodales ante. Curabitur pellentesque, risus auctor varius convallis, magna risus varius mi, ut pretium arcu mi id turpis. Cras tempus sit amet ante sed mollis.' 
            + 'Pellentesque placerat nisl id magna sollicitudin volutpat. Morbi suscipit non nibh a accumsan. Vestibulum porttitor ante in odio vehicula lobortis. Nulla lacus orci, dapibus non tellus eu, mollis luctus metus. In vitae congue elit.'
            + 'Duis diam leo, varius ac feugiat ac, dictum quis nisi. Nullam blandit dictum facilisis. Proin tincidunt turpis in ipsum rhoncus porta. Vivamus quis tellus accumsan, sollicitudin est sit amet, dapibus diam. Ut commodo dolor ac nunc luctus, ac viverra est placerat.' 
            + 'Fusce consectetur lacinia rhoncus. Vivamus sed nunc quis massa gravida pulvinar. Donec non turpis quis tortor sodales tincidunt eget vel velit. Nulla blandit, lacus ac suscipit porttitor, est tortor dapibus erat, non euismod metus neque vel quam.' 
            + 'Nunc vulputate porttitor erat nec luctus.',
            image: article2,
            tags: ['tag1', 'tag2', 'tag3', 'tag4'],
            rating: 5,
        },
    ];

    // const dispatch = useDispatch();
    // const { articles, loading, error } = useSelector((state) => state.articles);

    // useEffect(() => {
    //     dispatch(fetchWebSocketData());
    // }, [dispatch]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <div>
            {articles.map((article) => (
                <Article key={article.title} {...article} />
            ))}
        </div>
    );
}