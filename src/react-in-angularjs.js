class ReactComponentWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = props;
        this.ref = React.createRef();
    }

    componentDidMount() {
        const { services } = this.props;

        for (let serviceName in services) {
            if (!services.hasOwnProperty(serviceName)) {
                continue;
            }

            const service = services[serviceName];
            if (service.subscribe) {
                service.subscribe(updatedService => this.setState({
                    [serviceName]: updatedService,
                }), this.ref);
            }
        }
    }

    componentWillUnmount() {
        const { services } = this.props;

        for (let serviceName in services) {
            if (!services.hasOwnProperty(serviceName)) {
                continue;
            }

            const service = services[serviceName];
            if (service.unsubscribe) {
                service.unsubscribe(this.ref);
            }
        }
    }

    render() {
        const Children = this.props.children;
        return <Children {...this.state} ref={this.ref} />
    }
}

(function IIFE(angular) {
    'use strict';

    function ReactComponentDirective() {
        function link(scope, el) {
            ReactDOM.render(<ReactComponentWrapper {...scope.props} services={scope.services}>{scope.component}</ReactComponentWrapper>, el[0]);

            scope.$on('$destroy', function onComponentDestroy() {
                ReactDOM.unmountComponentAtNode(el[0]);
            });
        }

        return {
            link: link,
            replace: true,
            restrict: 'E',
            scope: {
                component: '<',
                props: '<',
                services: '<',
            },
        };
    }

    /////////////////////////////

    angular.module('react-component', []).directive('reactComponent', ReactComponentDirective);
})(angular);
