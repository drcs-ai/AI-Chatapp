interface Props {
    label: string;
}

const DateDivider: React.FC<Props> = ({ label }) => (
    <div className="date-divider">
        <span>{label}</span>
    </div>
);

export default DateDivider;